import { betterAuth } from "better-auth"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db(process.env.DB_NAME)

const closedConnectionErrors = ["MongoTopologyClosedError", "MongoNotConnectedError"]

const isClosedConnectionError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false
  return (
    closedConnectionErrors.includes(error.name) ||
    isClosedConnectionError(error.cause)
  )
}

export const withAuthDb = async <T>(task: () => Promise<T>): Promise<T> => {
  await client.connect()
  try {
    return await task()
  } catch (error) {
    if (!isClosedConnectionError(error)) throw error
    await client.connect()
    return task()
  }
}

const signUpRoles = ["student", "tutor"]

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    modelName: "users",
    additionalFields: {
      role: {
        type: ["student", "tutor", "admin"],
        required: false,
        input: true,
        defaultValue: "student",
      },
      plan: {
        type: ["free", "pro"],
        required: false,
        input: false,
        defaultValue: "free",
      },
      phone: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      bio: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = signUpRoles.includes(user.role as string)
            ? user.role
            : "student"
          return { data: { ...user, role, plan: "free" } }
        },
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/update-user" && ctx.body && "role" in ctx.body) {
        throw new APIError("BAD_REQUEST", {
          message: "Role cannot be changed from your profile",
        })
      }
    }),
  },
})

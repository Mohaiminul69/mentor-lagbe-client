import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db(process.env.DB_NAME)

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
      update: {
        before: async (data) => {
          const safeData = { ...data }
          delete safeData.role
          delete safeData.plan
          return { data: safeData }
        },
      },
    },
  },
})

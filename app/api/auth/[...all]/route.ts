import { toNextJsHandler } from "better-auth/next-js"
import { auth, withAuthDb } from "@/lib/auth"

const handler = toNextJsHandler(auth)

export const GET = (request: Request) =>
  withAuthDb(() => handler.GET(request.clone()))

export const POST = (request: Request) =>
  withAuthDb(() => handler.POST(request.clone()))

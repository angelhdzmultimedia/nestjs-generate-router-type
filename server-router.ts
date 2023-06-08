export const routes = [
  "/auth/login",
  "/auth/register",
  "/auth/user"
] as const

export type ServerRouter = typeof routes[number]
   
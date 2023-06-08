const routes = [
  "/auth/login",
  "/auth/register",
  "/auth/user"
] as const

export type AppRouter = typeof routes[number]
   
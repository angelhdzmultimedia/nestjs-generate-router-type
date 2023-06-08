import { INestApplication } from '@nestjs/common'
import { writeFileSync } from 'fs'
import { exit } from 'process'
import { bootstrap } from './main'

function getRoutes(router: any): string[] {
  const routes: string[] = []

  for (const controller of router._router.stack) {
    if (controller.route && controller.route.path) {
      const path = controller.route.path
      routes.push(path)
    }
  }

  return routes
}

function generateRouterType(router) {
  const routes = getRoutes(router)
  writeFileSync(
    'server-router.ts',
    `export const routes = ${JSON.stringify(routes, null, 2)} as const

export type ServerRouter = typeof routes[number]
   `,
  )
}

async function generateBootstrap() {
  let _app
  await bootstrap((app: INestApplication) => {
    _app = app
    return false
  })
  await _app.listen(5003)
  const router = _app.getHttpAdapter().getInstance()
  generateRouterType(router)
  exit(0)
}

generateBootstrap()

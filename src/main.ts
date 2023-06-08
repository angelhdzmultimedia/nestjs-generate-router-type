import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

export async function bootstrap(exportApp = null) {
  const app = await NestFactory.create(AppModule)
  let canStart = true

  if (exportApp) {
    canStart = exportApp(app)
  }

  if (canStart) {
    await app.listen(3000)
  }
}
bootstrap()

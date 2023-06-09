import { INestiaConfig } from '@nestia/sdk'

const config: INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/api',
  distribute: 'packages/api',
}
export default config

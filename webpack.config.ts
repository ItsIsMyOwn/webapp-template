import type { Configuration } from 'webpack'
import type { Configuration as ServerConfiguration } from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

const DEFAULT_PORT = 3000
enum Mode {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

type WebpackConfiguration = Configuration & {
  devServer?: ServerConfiguration
}
type Env = Record<string, string> & {
  mode: Mode
  port: string
}

const config = (env: Env): WebpackConfiguration => {
  const mode = env.mode ?? Mode.DEVELOPMENT

  return {
    mode, 
    entry: path.join(__dirname, './app/index.ts'),
    resolve: {
      extensions: ['.ts', ".js"] 
    },
    output: {
      path: path.join(__dirname, '/build/'),
      filename: 'index.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './app/assets/html/index.html')
      })
    ],
    devServer: {
      port: DEFAULT_PORT,
      liveReload: true,
      open: true,
    }
  }
}

export default config

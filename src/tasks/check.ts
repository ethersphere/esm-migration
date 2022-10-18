import { ListrTask } from 'listr2'
import { execa } from 'execa'
import { Ctx } from '../types.js'
import { checkFileExists } from '../utils.js'
import { join } from 'node:path'

export function tsNode (): ListrTask<Ctx> {
  return {
    title: 'Check for ts-node',
    task: async function (ctx) {
      const result = await execa('npm', ['ls', 'ts-node'], { localDir: ctx.path })

      // npm-ls found ts-node in dependencies
      if (result.exitCode === 0) {
        ctx.afterMessage.push(`There is "ts-node" in your dependencies. If you are directly using it, switch to ts-node-esm binary to use ESM compatible version. See: https://github.com/TypeStrong/ts-node#native-ecmascript-modules.`)
        ctx.afterMessage.push('Also in ESM the relative import paths needs to be full paths, including the ".js" suffix. So if you are using ts-node to run your app then add also \'--experimentalSpecifierResolution=node\' flag, which lifts this requirement.')
      }

    }
  }
}

export function tsJest (): ListrTask<Ctx> {
  return {
    title: 'Check for TS Jest config',
    task: async function (ctx) {
      if (await checkFileExists(join(ctx.path, 'jest.config.ts'))) {
        ctx.afterMessage.push(`The Jest config is written in TypeScript, which is unfortunately not possible to have in ESM (as Jest uses ts-node to parse it and Jest at the moment does not support loading it as ESM). Rename it to "jest.config.mjs" and remove the typings from it.
        Also don't forget to remove @jest/types package if it is installed.`)
      }

    }
  }
}

import { ListrTask } from 'listr2'
import { checkFileExists } from '../utils.js'
import { join } from 'node:path'
import { rename } from 'fs/promises'
import { Ctx } from '../types.js'

export function commitlint (): ListrTask<Ctx> {
  return {
    title: 'Rename commitlint config',
    task: async (ctx, task) => {
      if (!await checkFileExists(join(ctx.path, 'commitlint.config.js'))) {
        task.skip('No commitlint config present.')
        return
      }

      await rename(join(ctx.path, 'commitlint.config.js'), join(ctx.path, 'commitlint.config.mjs'))
    }
  }
}

export function eslint (): ListrTask<Ctx> {
  return {
    title: 'Rename Eslint config',
    task: async (ctx, task) => {
      if (!await checkFileExists(join(ctx.path, '.eslintrc.js'))) {
        task.skip('No Eslint config present.')
        return
      }

      await rename(join(ctx.path, '.eslintrc.js'), join(ctx.path, '.eslintrc.cjs'))
    }
  }
}

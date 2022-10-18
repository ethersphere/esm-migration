import { ListrTask } from 'listr2'
import { execa } from 'execa'
import { Ctx } from '../types.js'
import { checkFileExists, readJson, writeJson } from '../utils.js'
import { join } from 'node:path'

export function babel (): ListrTask<Ctx> {
  return {
    title: 'Add Babel',
    async task (ctx, task) {
      const shouldContinue = await task.prompt({
        type: 'confirm',
        message: 'Do you want to add Babel for adding ".js" suffix to imports?'
      })

      if (!shouldContinue) {
        task.skip('Babel - not requested')
        return
      }

      await execa('npm', ['install', '--save-dev', '@babel/cli', '@babel/core', 'babel-plugin-add-import-extension'], { localDir: ctx.path })

      const depcheckPath = join(ctx.path, '.depcheckrc.json')
      if (await checkFileExists(depcheckPath)) {
        const depcheck = await readJson<{ ignores: string[] }>(depcheckPath)
        depcheck.ignores.push('babel-plugin-add-import-extension', '@babel/*')
        await writeJson(depcheckPath, depcheck)
      }

      ctx.afterMessage.push('Add to the build step following Babel command: "babel --no-babelrc --plugins \"babel-plugin-add-import-extension\" --out-dir <distDir> <distDir>" and replace the <distDir> with path to transpiled source code.')
    }
  }
}

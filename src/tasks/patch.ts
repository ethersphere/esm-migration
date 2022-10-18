import {join} from 'node:path'
import { Ctx } from '../types.js'
import type { ListrTask } from 'listr2'
import { readJson, writeJson } from '../utils.js'

export function packageJson (): ListrTask<Ctx> {
  return {
    title: 'Patch package.json',
    task: async (ctx) => {
      const packageJsonPath = join(ctx.path, 'package.json')
      const packageJsonContent = await readJson<{type: string}>(packageJsonPath)
      packageJsonContent.type = 'module'

      await writeJson(packageJsonPath, packageJsonContent)
    }
  }
}

interface Tsconfig {
  compilerOptions: {target: string, module: string}
}

export function tsconfig (): ListrTask<Ctx> {
  return {
    title: 'Patch tsconfig.json',
    task: async (ctx) => {
      const packageJsonPath = join(ctx.path, 'tsconfig.json')
      const packageJsonContent = await readJson<Tsconfig>(packageJsonPath)
      packageJsonContent.compilerOptions.target = 'es2020'
      packageJsonContent.compilerOptions.module = 'es2020'

      await writeJson(packageJsonPath, packageJsonContent)
    }
  }
}

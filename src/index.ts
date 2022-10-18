#!/usr/bin/env node

import { Listr } from 'listr2'
import { cwd } from 'node:process'

import type { Ctx } from './types.js'

import * as patch from './tasks/patch.js'
import * as rename from './tasks/rename.js'
import * as add from './tasks/add.js'
import * as check from './tasks/check.js'
import chalk from 'chalk'

const ctx: Ctx = {
  path: cwd(),
  afterMessage: []
}

/**
 * TODO: Jest:
 *  - If `ts-jest` use `ts-jest/presets/default-esm` and bellow
 *  - Add to "npm test": cross-env 'NODE_OPTIONS=${NODE_OPTIONS:--experimental-vm-modules}'
 *  - Install `@naholyr/cross-env`
 *
 */

/*

    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
      '^.+\\.m?[tj]sx?$': [
        'ts-jest',
        {
          useESM: true,
        },
      ],
    },
 */

const tasks = new Listr<Ctx>([
  patch.packageJson(),
  patch.tsconfig(),
  rename.commitlint(),
  add.babel(),
  check.tsNode(),
  check.tsJest(),
], { ctx })

try {
  const ctx = await tasks.run()

  console.log(`\n${chalk.bold('Some after thoughts:')}`)

  for (const msg of ctx.afterMessage) {
    console.log('👉', msg, '\n')
  }
} catch (e) {
  console.error(e)
}

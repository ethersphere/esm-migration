# ESM Migration tool

[![Tests](https://github.com/ethersphere/esm-migration/actions/workflows/tests.yaml/badge.svg)](https://github.com/ethersphere/esm-migration/actions/workflows/tests.yaml)
[![Dependency Status](https://david-dm.org/ethersphere/esm-migration.svg?style=flat-square)](https://david-dm.org/ethersphere/esm-migration)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fethersphere%2Fesm-migration.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fethersphere%2Fesm-migration?ref=badge_shield)
[![](https://img.shields.io/badge/made%20by-Swarm-blue.svg?style=flat-square)](https://swarm.ethereum.org/)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
![](https://img.shields.io/badge/npm-%3E%3D6.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D12.0.0-orange.svg?style=flat-square)

> Simple CLI utility that ease to transition to ESM for @ethersphere JS projects

## Usage

**This is not "one-fit-all" tool! It should just help you with the basic chores for the project to be migrated! Use your own brain and see what does/does not make sense!**

Run the command on fresh branch and afterward see `git diff` for what changes were made and they make sense. Also, then see if tests runs and CI passes.
Most probably more tweaks will be needed for the migration to be successful.


```shell
$ npm install -g @ethersphere/esm-migration
$ cd "to/your/project"
$ esm-migration

# See what changes were made and if they make sense
$ git diff
```

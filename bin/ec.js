#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const path = require('path')
const questions = require('../lib/questions')
const checkEnv = require('../lib/checkenv')
const { createCzConfig } = require('../lib/utils')
const requiredVersion = require('../package.json').engines.node

checkEnv({ wanted: requiredVersion, id: 'commitizen' })

function installDependencies(adapter) {
  const filePath = path.resolve(process.cwd(), 'package.json')
  spawn.sync('npm', ['i', 'commitizen', adapter], { stdio: 'inherit' })
  createCzConfig(filePath, adapter)
  console.log(chalk.cyan('✅ Dependent installation complete！'))
}

inquirer
  .prompt(questions)
  .then(answers => {
    console.log(chalk.cyan('🕑  Please wait while the dependency installation starts...'))
    const { byDefault, adapter } = answers
    installDependencies(byDefault ? 'cz-conventional-changelog' : adapter)
  })
  .catch(error => {
    console.log(chalk.red('❌ Project configuration failed:'))
    if (error.isTtyError) {
      console.log(chalk.red("Prompt couldn't be rendered in the current environment"))
    } else {
      console.log(chalk.red(error))
    }
    process.exit(1)
  })

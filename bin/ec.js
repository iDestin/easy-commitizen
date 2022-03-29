#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const questions = require('../lib/questions')
const checkEnv = require('../lib/checkenv')
const requiredVersion = require('../package.json').engines.node

checkEnv({ wanted: requiredVersion, id: 'commitizen' })

function installDependencies(adapter) {
  spawn.sync('npm', ['i', 'commitizen', adapter], { stdio: 'inherit' })
  spawn.sync('echo', [`{"path": "${adapter}"}`, '>', '.czrc'], { stdio: 'inherit' })
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

#!/usr/bin/env node

const inquirer = require('inquirer')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const semver = require('semver')
const questions = require('../lib/questions')
const requiredVersion = require('../package.json').engines.node

function checkNodeVersion (wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'commitizen')

inquirer.prompt(questions).then((answers) => {
  console.log(chalk.cyan('🕑  开始安装依赖，请等待...'))
  const { adapter } = answers
  if(adapter) {
    spawn.sync('npm', ['i', 'commitizen', adapter], { stdio: 'inherit' })
    spawn.sync('echo', [`{"path": "${adapter}"}`,'>','.czrc'],{ stdio: 'inherit' })
    console.log(chalk.cyan('✅ 依赖安装完成！'))
  }
}).catch((error) => {
  console.log(chalk.red('❌ 项目配置失败:'))
  if (error.isTtyError) {
    console.log(chalk.red("Prompt couldn't be rendered in the current environment"))
  } else {
    console.log(chalk.red(error))
  }
  process.exit(1)
})
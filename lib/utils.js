const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const chalk = require('chalk')

function readPackageSync(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function createCzConfig(filePath, adapter) {
  const packageJSON = readPackageSync(filePath)
  const { scripts = {}, config = {} } = packageJSON || {}
  packageJSON['scripts'] = {
    ...scripts,
    c: 'git add . && git-cz',
  }
  packageJSON['config'] = {
    ...config,
    commitizen: { path: adapter },
  }
  const content = JSON.stringify(packageJSON)
  fs.writeFile(filePath, content, function (err) {
    if (err) {
      throw err
    }
  })
}

function installDependencies(adapter) {
  const filePath = path.resolve(process.cwd(), 'package.json')
  spawn.sync('npm', ['i', '-D', 'commitizen', adapter], { stdio: 'inherit' })
  createCzConfig(filePath, adapter)
  console.log(chalk.cyan('✅ Dependent installation complete！'))
}

module.exports = { createCzConfig, installDependencies }

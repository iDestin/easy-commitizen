const chalk = require('chalk')
const semver = require('semver')
const fs = require('fs')
const path = require('path')

// This code is from @vue/cli
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          id +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.'
      )
    )
    process.exit(1)
  }
}

function checkPackageJson() {
  const hasPackageJson = fs.existsSync(process.cwd() + '/package.json')
  if (!hasPackageJson) {
    console.log(chalk.red('Check that there is no package.json file in this directory. You can run \n'))
    console.log(chalk.cyan('npm init\n'))
    process.exit(1)
  }
}

function checkEnv(nodeInfo) {
  const { wanted, id } = nodeInfo
  checkNodeVersion(wanted, id)
  checkPackageJson()
}

module.exports = checkEnv

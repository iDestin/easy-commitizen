const fs = require('fs')
const chalk = require('chalk')
const semver = require('semver')

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    console.log('\n')
    console.log(
      chalk.red(
        `You are using Node ${process.version}, but this version of ${id} requires Node ${wanted}.\nPlease upgrade your Node version`,
      ),
    )
    console.log('\n')
    process.exit(1)
  }
}

function checkPackageJson() {
  const hasPackageJson = fs.existsSync(`${process.cwd()}/package.json`)
  if (!hasPackageJson) {
    console.log('\n')
    console.log(
      chalk.red(
        'Check that there is no package.json file in this directory. You can run \n',
      ),
    )
    console.log(chalk.cyan('npm init\n'))
    console.log('\n')
    process.exit(1)
  }
}

function checkEnv(nodeInfo) {
  const { wanted, id } = nodeInfo
  checkNodeVersion(wanted, id)
  checkPackageJson()
}

module.exports = checkEnv

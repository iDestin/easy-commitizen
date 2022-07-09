const spawn = require('cross-spawn')
const chalk = require('chalk')
const PackageJson = require('@npmcli/package-json')

async function createCzConfig(filePath, adapter) {
  const packageJSON = await PackageJson.load(filePath)
  packageJSON.update({
    scripts: {
      ...packageJSON?.content?.scripts,
      ec: 'git add . && git-cz',
    },
    config: {
      ...packageJSON?.content?.config,
      commitizen: { path: adapter },
    },
  })
  await packageJSON.save()
}

async function installDependencies(adapter) {
  spawn.sync('npm', ['i', '-D', 'commitizen', adapter], { stdio: 'inherit' })
  await createCzConfig(process.cwd(), adapter)
  console.log(chalk.cyan('✅ Dependent installation complete！'))
  console.log('\n')
}

module.exports = { createCzConfig, installDependencies }

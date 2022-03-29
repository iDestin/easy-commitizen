const fs = require('fs')

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

module.exports = { createCzConfig }

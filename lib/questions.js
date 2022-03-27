module.exports = [
  {
    type: 'confirm',
    name: 'byDefault',
    message: '是否使用默认的适配器(cz-conventional-changelog)?',
  },
  {
    type: 'list',
    name: 'adapter',
    message: '请选择您想使用的适配器',
    when: ({ byDefault }) => !byDefault,
    suffix: '^.^',
    choices: [
      'cz-conventional-changelog', 
      'cz-jira-smart-commit', 
      'cz-jira-smart-commit',
      '@endemolshinegroup/cz-jira-smart-commit',
      '@endemolshinegroup/cz-github',
      'rb-conventional-changelog',
      '@mapbox/cz-mapbox-changelog',
      'cz-customizable',
      'cz-commitlint',
      'commitlint',
      'vscode-commitizen',
      'cz-emoji',
      'cz-adapter-eslint',
      'commitiquette',
      'cz-format-extension',
      'cz-emoji-conventional',
      'cz-git'
    ]
  }
]
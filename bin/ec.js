#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const questions = require('../lib/questions')

/**
 * TODO: 
 *  1. 检查node版本
 *  2. 检查是否有package.json
 *  3. 检查是否有其他的适配器
 *  4. 添加husky
 */

inquirer.prompt(questions).then((answers) => {
  console.log(chalk.cyan('🕑  开始安装依赖，请等待...'));
  const { adapter } = answers
  if(adapter) {
    spawn.sync('npm', ['i', 'commitizen', adapter], { stdio: 'inherit' });
    spawn.sync('echo', [`{"path": "${adapter}"}`,'>','.czrc'],{ stdio: 'inherit' })
    console.log(chalk.cyan('✅ 依赖安装完成！'));
  }
}).catch((error) => {
  console.log(chalk.red('❌ 项目配置失败:'));
  if (error.isTtyError) {
    console.log(chalk.red("Prompt couldn't be rendered in the current environment"));
  } else {
    console.log(chalk.red(error));
  }
  process.exit(1)
});
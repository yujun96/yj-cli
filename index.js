#! /usr/bin/env node    
// 使用node去执行这个命令

// console.log("yj-cli工具")
// console.log(process.argv)
const { program } = require('commander');
const download = require('download-git-repo')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const fs = require('fs')
const ora = require('ora')

const templates = {
  'tpl-a': {
    url:'https://github.com/yujun96/tpl-a.git',
    downloadUrl:'http://github.com:yujun96/tpl-a#main',
    decscription: 'a模版'
  },
  'tpl-b': {
    url:'https://github.com/yujun96/tpl-b.git',
    downloadUrl:'http://github.com:yujun96/tpl-b#main',
    decscription: 'b模版'
  },
  'tpl-c': {
    url:'https://github.com/yujun96/tpl-c.git',
    downloadUrl:'http://github.com:yujun96/tpl-c#main',
    decscription: 'c模版'
  }
}

program
  .version('0.2.0')
 
program
  .command('init <templateName> <projectName>')
  .description('初始化项目模版')
  .action((templateName, projectName)=>{
    // 仓库地址
    // 下载路径
    //  下载之前做loading提示
    var spinner = ora('正在下载模版start......').start();

    const {downloadUrl} = templates[templateName]
    console.log(downloadUrl)
    download(downloadUrl,projectName,{ clone:true },(err) => {
      if(err){
        console.log(err)
        spinner.fail()   // 下载失败
        console.log(logSymbols.error,chalk.red('初始化模版失败'))
        return 
      }
      spinner.succeed()   // 下载成功
      inquirer.prompt([
        {
          type:'input',
          name:'name',
          message:'请输入项目名称'
        },
        {
          type:'input',
          name:'description',
          message:'请输入项目简介'
        },
        {
          type:'input',
          name:'author',
          message:'请输入项目作者'
        }
      ]).then((answers)=>{
        const packageContent = fs.readFileSync(`${projectName}/package.json`,'utf8')
        const packageResult = handlebars.compile(packageContent)(answers)
        fs.writeFileSync(`${projectName}/package.json`,packageResult)
        console.log(logSymbols.success,   chalk.yellow('初始化模版成功'))
      })
      

    })
  });

  program
  .command('list')
  .description('查询模版')
  .action(function(){
    for(let key in templates) {
      console.log(`${key} ${templates[key].decscription}`)
    }
  });

  program.parse(process.argv);
 


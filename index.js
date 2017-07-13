#!/usr/bin/env node

'use strict';

var unzip = require('unzip');
var download = require('download');
var fs = require('fs');
var process = require('process');
var child_process = require('child_process');
var inquirer = require('inquirer');
var chalk = require('chalk');
var pkg = require('./package.json');


var options = [
  ['-V', '--version', 'The version of yumu-server'],
  ['-h', '--help', 'The help of yumu-server']
]

module.exports = {
  pkg: pkg,
  options: options,
  init: init,
  action: action
}

function action (option, version) {
  if(option == 'version') {
    console.log(chalk.cyan('  ' + version));
  }
  if(option == 'help') {
    outputHelpInfo(options);
  }
}

function outputHelpInfo(options) {
  console.log(chalk.yellow('  Usage: server [option] <type>'));
  console.log('');
  console.log(chalk.yellow('  yumu server'));
  console.log('');
  console.log(chalk.yellow('  Options:'));
  console.log('');
  for( var i = 0; i < options.length; i ++ ) {
    var str = '  ' + options[i][0] + ', ' + options[i][1] + getSpace(24, options[i][1]) + options[i][2];
    console.log(chalk.yellow(str));
  }
  console.log('');
}

function getSpace(total, str) {
  var spaceStr = '';
  var len = total - str.length;
  while(len){
    spaceStr += ' ';
    len --;
  }
  return spaceStr;
}

function init() {
  console.log('');
  var getResult;
  try {
    getResult = child_process.execSync('npm run start', { encoding: 'utf8' });
  } catch(err) {
    console.log(err.stderr);
  }
  process.stdout.write(getResult);
}

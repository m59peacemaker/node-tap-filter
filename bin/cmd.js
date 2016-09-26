#!/usr/bin/env node

const program = require('commander')
const parser = require('@m59/tap-parser')
const filter = require('../')
const supportedTypes = require('../lib/supported-types')
const spacer = '\n    '

const args = program
  .arguments('[types...]', 'types of TAP to be output')
  .option('-r, --reverse', 'filter out given types')
  .on('--help', () => {
    console.log(`  TAP types:${spacer}${supportedTypes.join(spacer)}`)
  })
  .parse(process.argv)

process.stdin
  .pipe(parser())
  .pipe(filter(args.args, args.reverse))
  .pipe(process.stdout)

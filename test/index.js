const test = require('tape')
const parser = require('@m59/tap-parser')
const filter = require('../')
const through = require('throo')

test('parser stream', t => {
  t.plan(1)
  const p = parser()
  p.on('data', data => {
    t.deepEqual(data, {parsed: {end: 2, start: 1}, type: 'plan', value: '1..2'})
  })
  p.write('1..2\n')
})

test('filters out "plan" when given "test" type', t => {
  t.plan(1)
  const p = parser().pipe(filter(['test'])).pipe(through((push, chunk, enc, cb) => {
    t.equal(String(chunk), 'ok 1 stuff\n')
  }))
  p.write('1..2\n')
  p.write('ok 1 stuff\n')
})

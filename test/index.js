const test = require('tape')
const parser = require('@m59/tap-parser')
const filter = require('../')
const through = require('throo')

test('composing through streams', t => {
  t.plan(1)
  const a = through((push, chunk, enc, cb) => {
    push(String(chunk) + 'b')
    cb()
  })
  const b = through((push, chunk, enc, cb) => {
    push(String(chunk) + 'c')
    cb()
  })
  const c = a.pipe(b)
  c.on('data', data => {
    t.equal(String(data), 'abc')
  })
  c.write('a')
})

test('parser stream', t => {
  t.plan(1)
  const p = parser()
  p.on('data', data => {
    t.deepEqual(data, {parsed: {end: 2, start: 1}, type: 'plan', value: '1..2'})
  })
  p.write('1..2\n')
})

test('filter stream filters out "plan" when given "test" type', t => {
  t.plan(1)
  const f = filter(['test'])
  f.on('data', data => {
    t.equal(data, 'ok 1 blah\n')
  })
  f.write({type: 'plan', value: '1..2'})
  f.write({type: 'test', value: 'ok 1 blah'})
})

test('composes with parser', t => {
  t.plan(1)
  const stream = parser().pipe(filter(['test']))
  stream.on('data', data => {
    t.equal(data, 'ok 1 stuff\n')
  })
  stream.write('1..2\n')
  stream.write('ok 1 stuff\n')
})

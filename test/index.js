const test = require('tape')
const filter = require('../')

test('filters out "plan" when given "diagnostic" type', t => {
  t.plan(1)
  const stream = filter(['diagnostic'])
  stream.on('data', data => {
    t.equal(data, '# hey\n')
  })
  stream.write('1..2\n')
  stream.write('# hey\n')
})

test('filters out "plan" when given "plan" type with reverse: true', t => {
  t.plan(1)
  const stream = filter(['plan'], true)
  stream.on('data', data => {
    t.equal(data, '# hey\n')
  })
  stream.write('1..2\n')
  stream.write('# hey\n')
})

test('supports test-pass', t => {
  t.plan(1)
  const stream = filter(['test-pass'])
  stream.on('data', data => {
    t.equal(data, 'ok 1 hey\n')
  })
  stream.write('1..2\n')
  stream.write('ok 1 hey\n')
  stream.write('# eh\n') // so the parser knows the test doesn't have a document
})


test('supports test-fail', t => {
  t.plan(1)
  const stream = filter(['test-fail'])
  stream.on('data', data => {
    t.equal(data, 'not ok 1 hey\n')
  })
  stream.write('1..2\n')
  stream.write('ok 1 hey\n')
  stream.write('not ok 1 hey\n')
  stream.write('# eh\n') // so the parser knows the test doesn't have a document
})

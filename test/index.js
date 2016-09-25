const test = require('tape')
const filter = require('../')

test('filters out "plan" when given "test" type', t => {
  t.plan(1)
  const filterStream = filter(['test'])
  filterStream.on('data', data => {
    t.equal(data, 'ok 1 stuff')
    filterStream.end()
  })
  filterStream.write('1..2')
  filterStream.write('ok 1 stuff')
})

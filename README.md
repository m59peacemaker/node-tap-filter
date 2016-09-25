# tap-filter

Stream that receives TAP and filters it according to given TAP types.

## install

```sh
npm install tap-filter
```

## example

```sh
# run tests, output only test and plan lines, format with tap-spec
npm test | tap-filter plan test | tap-spec
```

```js
const filter = require('tap-filter')

someTapStream
  .pipe(filter(['test-fail']))
  .pipe(process.stdout)
```
## types

- version
- plan
- bailout
- diagnostic
- test
- test-pass
- test-fail

## cli

```sh
tap-parser [options] [types...]

  Options:

    -h, --help     output usage information
    -r, --reverse  filter out given types

  TAP types:
    version
    plan
    bailout
    diagnostic
    test
    test-pass
    test-fail
```

## API

### filter(types = [], reverse = false)

- `types` (array)
- `reverse` (boolean)

const supportedTypes = require('./supported-types')

const assertTypesAreValid = types => {
  types.forEach(type => {
    if (!supportedTypes.includes(type)) {
      throw new Error(`"${type}" is not a valid TAP type`)
    }
  })
}

module.exports = assertTypesAreValid

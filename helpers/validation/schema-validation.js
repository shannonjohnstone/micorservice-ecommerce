/**
* Schema validation framework
* This schema validation a temporary place holder until a better place is found to implement
*/
function throwValidationException(message) {
  throw new Error(message)
}

function isRequired(val) {
  return val && !!val.match(/!$/g)
}

function typeMatch(value, type) {
  return typeof value === type
}

function validateSchemaValues(schema, args, message) {
  if(!args) return throwValidationException(message || 'validation failed')

  for (let key in schema) {
    const value = args[key]
    const schemaValueType = schema[key].split('!')[0]

    const requieredMatch = isRequired(schema[key]) && typeMatch(value, schemaValueType)
    const optionalMatch = value && typeMatch(value, schemaValueType)
    const optionalNoValue = !isRequired(schema[key]) && !value

    // console.log(optionalNoVale, 'optionalNoVale...');
    if (!(!isRequired(schema[key]) && !value) && !requieredMatch && !optionalMatch) {
      return throwValidationException(message || 'validation failed')
    }

  }
  return true
}

module.exports = {
  validateSchemaValues,
  throwValidationException
}

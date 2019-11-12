export const isEmpty = thing => !thing || thing === '' || (Object.entries(thing).length === 0 && thing.constructor === Object)

export const testRegex = (regex, stringToTest) => new RegExp(regex).test(stringToTest)

export const fieldErrors = {
  minLength: 'minLength',
  required: 'required',
}

export const validateField = (field, fieldValue) => {
  let errors = []
  if (field.required && isEmpty(fieldValue))
    errors.push({
      type: fieldErrors.required,
      desc: field.notEmptyError || 'Required field'
    })
    if (field.regex && !isEmpty(fieldValue) && !testRegex(field.regex, fieldValue))
    errors.push({
      type: fieldErrors.regex,
      desc: field.regexError || 'Format is incorrect'
    })
  if (field.customValidators && Array.isArray(field.customValidators)) {
    for (let i = 0; i < field.customValidators.length; i++) {
      let validator = field.customValidators[i]
      let valid = validator.func(fieldValue)
      if (!valid) {
        errors.push({type: 'custom', desc: validator.desc})
      }
    }
  }
  return errors
}

export const capitalize = (str) => str.slice(0, 1).toUpperCase() + str.slice(1, str.length)

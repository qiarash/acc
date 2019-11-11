import {fieldTypes} from './'

export const Tag = (obj = {}) => ({
  value: {
    value: obj,
    type: fieldTypes.string
  }
})

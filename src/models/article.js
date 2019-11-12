import {fieldTypes} from './'
import {Tag} from './tag'

const Author = (obj = {}) => ({
  username: {
    value: obj.username,
    type: fieldTypes.string
  }
})

export const Article = (obj = {}) => ({
  slug: {
    value: obj.slug,
    hiddenInTable: true,
    hiddenInForm: true
  },
  description: {
    value: obj.description,
    hiddenInTable: true,
    formOrder: 1,
    required: true,
    type: fieldTypes.string
  },
  title: {
    value: obj.title,
    type: fieldTypes.string,
    required: true,
    formOrder: 0
  },
  author: {
    value: obj.author,
    showBy: 'username',
    type: Author,
    hiddenInForm: true
  },
  tagList: {
    value: obj.tagList,
    label: 'tags',
    fieldLabel: 'tags',
    resource: 'tags',
    type: fieldTypes.list,
    elementType: Tag
  },
  body: {
    value: obj.body,
    formOrder: 2,
    required: true,
    label: 'excerpt',
    tableFormatter: val => val.length > 20
      ? val.slice(0, 20) + '...'
      : val,
    type: fieldTypes.longString
  },
  createdAt: {
    value: obj.createdAt,
    type: fieldTypes.date,
    label: 'created',
    elementType: Tag,
    hiddenInForm: true
  }
})

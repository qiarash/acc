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
    hiddenInTable: true
  },
  title: {
    value: obj.title,
    type: fieldTypes.string
  },
  author: {
    value: obj.author,
    showBy: 'username',
    type: Author
  },
  tagList: {
    value: obj.tagList,
    label: 'tags',
    type: fieldTypes.list,
    elementType: Tag
  },
  body: {
    value: obj.body,
    label: 'excerpt',
    tableFormatter: val => val.length > 20
      ? val.slice(0, 20) + '...'
      : val,
    type: fieldTypes.string
  },
  createdAt: {
    value: obj.createdAt,
    type: fieldTypes.date,
    label: 'created',
    elementType: Tag
  }
})

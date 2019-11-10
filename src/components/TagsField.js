import React from 'react'

const TagsField = ({record}) => (<div>
  {
    record && record.tagList.map((item, index) => (<React.Fragment key={index}>
      <span>{item}</span>
      {index !== record.tagList.length - 1 && ', '}
    </React.Fragment>))
  }
</div>)

TagsField.defaultProps = {
  addLabel: true
}

export default TagsField

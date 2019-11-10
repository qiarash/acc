import React from 'react'

const BodyField = ({record}) => (
  <React.Fragment>{record.body.length > 20
  ? record.body.slice(0, 20) + '...'
  : record.body}</React.Fragment>)

BodyField.defaultProps = {
  addLabel: true
}

export default BodyField

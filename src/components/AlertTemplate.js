import React from 'react'
import {FaTimes} from 'react-icons/fa'
import styled from 'styled-components'
import {rgba} from 'polished'
import media from 'Utils/styles'

const AlertWrapper = styled.div `
  background: ${p => p.type === 'error'?p.theme.failureLight:p.theme.successLight};
  color: ${p => p.type === 'error'?p.theme.failure:p.theme.success};
  border: 1px solid ${p => rgba(p.type === 'error'?p.theme.failure:p.theme.success, .3)};
  padding: 15px 24px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100px;
  max-width: 500px;
  margin: 30px;
  ${media.xs
    `max-width: 300px;`
  }
`

const CloseButton = styled.button `
  marginLeft: 20px;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${p => p.type === 'error'?p.theme.failure:p.theme.success};
`
const Message = styled.div `
  display: flex;
  flex-direction: row;
  ${media.xs
    `flex-direction: column;`
  }
`

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <AlertWrapper type={options.type}>
      <Message>
        <span style={{fontWeight: 600, marginRight: 10}}>{message.title}</span>
        <span>{message.body}</span>
      </Message>
      <CloseButton onClick={close} type={options.type}>
        <FaTimes />
      </CloseButton>
    </AlertWrapper>
  )
}

export default AlertTemplate

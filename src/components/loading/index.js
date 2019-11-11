import React from 'react'
import './style.css'
import styled from 'styled-components'

const Wrapper = styled.div `
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

let Loading = () => (<Wrapper>
  <div className="lds-ripple">
    <div></div>
    <div></div>
  </div>
</Wrapper>)

export default Loading

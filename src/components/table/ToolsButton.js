import React from 'react'
import styled from  'styled-components'
import Button from  'Components/button'

const Wrapper = styled.div`
  position: relative;

  ul {
    position: absolute;
    z-index: 1;
    margin: 0;
    padding: 0;
    width: 175px;
    top: 100%;
    right: 0;
    border-radius: 4px;
    opacity: ${p => p.opened? 1: 0};
    visibility: ${p => p.opened? 'visible': 'hidden'};
    transition: all ease .3s;
    list-style: none;
    border: 1px solid ${p => p.theme.light};
    background: #fff;

    li{
      padding: 15px 12px;
      border-bottom: 1px solid ${p => p.theme.light};
      color: ${p => p.theme.dark4};
      font-weight: 300;

      :last-of-type{
        border-bottom: 0
      }
    }
  }
`

const ToolsButton = ({resource, item, opened, onClick}) => {
  return(
    <Wrapper opened={opened}>
      <Button styleType="primary" onClick={onClick}>...</Button>
      <ul>
        <li>edit</li>
        <li>delete</li>
      </ul>
    </Wrapper>
  )
}

export default ToolsButton

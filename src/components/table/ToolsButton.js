import React from 'react'
import styled from 'styled-components'
import Button from 'Components/button'
import THEME from 'Root/theme'
import {darken} from 'polished'
import DeleteModal from './DeleteModal'
import {Link} from 'react-router-dom'
import onClickOutside from "react-onclickoutside";

const Wrapper = styled.div `
  position: relative;
  justify-content: flex-end;
  display: flex;

  ul {
    position: absolute;
    z-index: 1;
    margin: 0;
    padding: 0;
    width: 175px;
    top: 100%;
    right: 0;
    border-radius: 4px;
    opacity: ${p => p.opened
  ? 1
  : 0};
    visibility: ${p => p.opened
    ? 'visible'
    : 'hidden'};
    transition: all ease .3s;
    list-style: none;
    border: 1px solid ${p => p.theme.light};
    background: #fff;

    li{
      a, button{
        display: block;
        padding: 15px 12px;
      }
      border-bottom: 1px solid ${p => p.theme.light};
      color: ${p => p.theme.dark4};
      font-weight: 300;

      :last-of-type{
        border-bottom: 0
      }
    }
  }
`

const ArrowDown = styled.span`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  margin-left: 10px;
  border-top: 5px solid #fff;
`

function ToolsButton({resource, item, opened, onClick, close, deletedCb}) {
  ToolsButton.close = () => close();
  return (<Wrapper opened={opened}>
    <Button width="auto" bgColor={opened
        ? darken(.1, THEME.secondary)
        : THEME.secondary} styleType="none" color='#fff' onClick={onClick}>
        ...
        <ArrowDown />
      </Button>
    <ul>
      <li>
        <Link to={`/${resource}/edit/${item.slug.value}`}>edit</Link>
      </li>
      <li>
        <DeleteModal resource={resource} item={item} deletedCb={deletedCb}/>
      </li>
    </ul>
  </Wrapper>)
}

const clickOutsideConfig = {
  handleClickOutside: () => ToolsButton.close
};

export default onClickOutside(ToolsButton, clickOutsideConfig)

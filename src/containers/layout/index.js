import React, {useState} from 'react'
import routes from 'Root/routes'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from 'Components/button'
import {FaBars} from 'react-icons/fa'
import media from 'Utils/styles'
import './style.css'

const Wrapper = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: ${p => p.row
  ? 'row'
  : 'column'};
`

const Side = styled.div `
  background: ${p => p.theme.primary};
  padding: 0;
  width: 250px;
  flex-basis: 250px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: all ease .3s;

  ${media.md`
    position: absolute;
    top: 0;
    bottom: 0
    left: ${p => p.opened?0:'-250px'};
  `};
`

const Header = styled.div `
  background: ${p => p.theme.dark4};
  color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 300;
    font-size: 22px;
    margin: 0;
    padding: 9px 0;
    display: inline-block;
  }

  > span{
    font-weight: 200;
  }
`

const Main = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 30px;
`

const SideMenuItem = styled.div`
  color: #fff;
  > a {
    padding: 16px 34px;
    display: block;
    font-size: 18px;
    text-transform: capitalize;
  }
`
const SideMenuItemLabel = styled.div`
  padding: 16px 18px;
  font-size: 22px;
`

const StyledLink = styled(Link)`
  :hover {${p => !p.active && `background: rgba(255,255,255,.1)`};}
  ${p => p.active && `background: rgba(255,255,255,.2)`};
`

const StyledButton = styled(Button)`
  display: none;
  ${media.md`
    display: block
  `};
`

let Layout = ({location, children}) => {
  let [menuOpened, setMenuOpened] = useState(false)
  let currentRoute = routes.find(r => r.path === location.pathname)
  let noLayout = currentRoute && currentRoute.noLayout
  if (noLayout)
    return (children)
  return (<Wrapper>
    <Header>
      <StyledButton width='auto' styles={{marginRight: 20}} onClick={()=>setMenuOpened(true)} icon={<FaBars />} />
      <h3>Arvan Challenge</h3>
      <span style={{flex: 1, marginLeft: 20}}>welcome dashaq</span>
      <Button width="auto">Logout</Button>
    </Header>
    <Wrapper row={true}>
      <Side opened={menuOpened}>
        {routes.filter(r => r.resource).map(route =>
          <SideMenuItem key={route.name}>
            <SideMenuItemLabel>{route.label}</SideMenuItemLabel>
            <StyledLink to={route.path} active={route.path === location.pathname} onClick={()=>setMenuOpened(false)}>All {route.resource}</StyledLink>
            <StyledLink to={route.path + '/create'} active={route.path + '/create' === location.pathname}>New {route.resource.slice(0, -1)}</StyledLink>
          </SideMenuItem>
        )}
      </Side>
      <Main>
        {children}
      </Main>
    </Wrapper>
  </Wrapper>)
}

export default Layout

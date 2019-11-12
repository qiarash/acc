import React, {useState} from 'react'
import {connect} from 'react-redux'
import routes from 'Root/routes'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Button from 'Components/button'
import {FaBars, FaTimes} from 'react-icons/fa'
import media from 'Utils/styles'
import store from 'store'
import './style.css'

const Wrapper = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: ${p => p.row
  ? 'row'
  : 'column'};

  ${media.xs`
    button {
      padding: 8px
    }
  `}
`

const Side = styled.div `
  background: ${p => p.theme.primary};
  padding: 0;
  width: 250px;
  flex-basis: 250px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  z-index: 10;
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
  max-height: 100%;
  overflow-y: auto;
  ${media.md`
    width: 100vw;
  `};
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
  :hover {${p => !p.isActive && `background: rgba(255,255,255,.1)`};}
  ${p => p.isActive && `background: rgba(255,255,255,.2)`};
`

const StyledButton = styled(Button)`
  display: none;
  ${media.md`
    display: block
  `};
`
const NameHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  span {
    margin-left: 20px;
  }
  ${media.sm`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 1;
    h3{
      padding: 0;
    }
    span {
      margin: 0;
    }
  `};
`
const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
  background: rgba(0,0,0,.7);
  transition: all ease .3s;
  opacity: ${p => p.visible? 1: 0 };
  visibility: ${p => p.visible? 'visible': 'hidden' };
`

let Layout = ({user, location, children,logout}) => {
  let [menuOpened, setMenuOpened] = useState(false)
  let currentRoute = routes.find(r => r.path === location.pathname)
  let noLayout = currentRoute && currentRoute.noLayout
  if (noLayout)
    return (children)
  return (<Wrapper>
    <Header>
      <StyledButton width='auto' styles={{marginRight: 20}} onClick={()=>setMenuOpened(!menuOpened)} icon={menuOpened?<FaTimes />:<FaBars />} />
      <NameHolder>
      <h3>Arvan Challenge</h3>
      <span style={{flex: 1}}>welcome {user && user.username}</span>
    </NameHolder>
      <Link to="/login"><Button onClick={() => {
        store.remove('token')
        logout()
      }} width="auto">Logout</Button></Link>
    </Header>
    <Wrapper row={true}>
      <Overlay visible={menuOpened} onClick={()=>setMenuOpened(false)}/>
      <Side opened={menuOpened}>
        {routes.filter(r => r.resource).map(route =>
          <SideMenuItem key={route.name}>
            <SideMenuItemLabel>{route.label}</SideMenuItemLabel>
            <StyledLink to={route.path} isActive={route.path === location.pathname} onClick={()=>setMenuOpened(false)}>All {route.resource}</StyledLink>
            <StyledLink to={route.path + '/create'} isActive={route.path + '/create' === location.pathname} onClick={()=>setMenuOpened(false)}>New {route.resource.slice(0, -1)}</StyledLink>
          </SideMenuItem>
        )}
      </Side>
      <Main>
        {children}
      </Main>
    </Wrapper>
  </Wrapper>)
}

export default connect(state => ({user: state.user}), {logout: () => ({type: 'LOGOUT'})})(Layout)

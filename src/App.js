import React from 'react'
import {Admin, Resource} from 'react-admin'
import restProvider from './rest-provider'
import {ArticleList, ArticleEdit} from './containers/articles'
import Nav from './layout/nav'
import {createMuiTheme} from '@material-ui/core/styles'
import Layout from './layout/index'
import { createBrowserHistory as createHistory } from 'history'
import './App.css'


const theme = createMuiTheme({
  palette: {
    primary: {main: '#1C7CD5'},
    error: {main: '#D9534F'},
    alternateTextColor: {main: '#fff'}
  }
})

const App = () => {
  let adminSettings = {
    theme,
    menu: Nav,
    appLayout: Layout,
    history: createHistory(),
    dataProvider: restProvider('https://conduit.productionready.io/api')
  }
  return (<Admin {...adminSettings}>
  <Resource name="articles" options={{
      label: "Post",
      name: 'article'
    }} list={ArticleList} edit={ArticleEdit}/>
</Admin>)}

export default App

import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import routes from './routes'
import ResourcePage from 'Containers/crud'
import Layout from 'Containers/layout'
import {ThemeProvider} from 'styled-components'
import theme from './theme'

function App() {
  return (<ThemeProvider theme={theme}><BrowserRouter>
    <Route render={({location}) => <Layout location={location}>
        <Switch>
          <React.Fragment>
            {
              routes.map(({
                Component,
                ...route
              }) => <React.Fragment key={route.name}>
                {
                  route.resource && <React.Fragment>
                      <Route path={route.path + '/page/:page'} exact={true} render={() => <span>{route.name}</span>}/>
                      <Route path={route.path + '/create'} exact={true} render={() => <span>{route.name}</span>}/>
                      <Route path={route.path + '/edit/:slug'} exact={true} render={() => <span>{route.name}</span>}/>
                    </React.Fragment>
                }
                <Route path={route.path} exact={true} render={props => route.resource
                    ? <ResourcePage {...route} {...props}/>
                    : <Component {...route} {...props}/>}/>
              </React.Fragment>)
            }
          </React.Fragment>
        </Switch>
      </Layout>}/>
  </BrowserRouter></ThemeProvider>);
}

export default App;

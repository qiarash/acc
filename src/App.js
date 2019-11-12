import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import routes from './routes'
import AuthHandler from './AuthHandler'
import ResourcePage from 'Containers/crud'
import AddEditPage from 'Containers/crud/add-edit'
import Layout from 'Containers/layout'
import {ThemeProvider} from 'styled-components'
import AlertTemplate from 'Components/AlertTemplate'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'
import theme from './theme'
import { Provider as AlertProvider} from 'react-alert'

const options = {
  position: 'top right',
  timeout: 5000,
  offset: '30px',
  transition: 'fade'
}

function App() {
  return (<Provider store={createStore(rootReducer)}>
    <ThemeProvider theme={theme}>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Route render={({location}) => (<React.Fragment>
          <Layout location={location}>
            <Switch>
              <React.Fragment>
                {
                  routes.map(({
                    Component,
                    ...route
                  }) => <React.Fragment key={route.name}>
                    {
                      route.resource && <React.Fragment>
                          <Route path={route.path + '/page/:page'} exact={true} render={props => <ResourcePage {...route} {...props}/>}/>
                          <Route path={route.path + '/create'} exact={true} render={props => <AddEditPage {...route} {...props}/>}/>
                          <Route path={route.path + '/edit/:slug'} exact={true} render={props => <AddEditPage {...route} {...props}/>}/>
                        </React.Fragment>
                    }
                    <Route path={route.path} exact={true} render={props => route.resource
                        ? <ResourcePage {...route} {...props}/>
                        : <Component {...route} {...props}/>}/>
                  </React.Fragment>)
                }
              </React.Fragment>
            </Switch>
          </Layout>
          <AuthHandler location={location}/>
        </React.Fragment>)}/>
      </BrowserRouter>
    </AlertProvider>
  </ThemeProvider>
</Provider>);
}

export default App;

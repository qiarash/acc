import {Article} from './models/article'
import LoginPage from 'Containers/auth/login'
import RegisterPage from 'Containers/auth/register'
import DashboardPage from 'Containers/dashboard'

export default [
  {
    path: '/',
    name: 'dashboard',
    Component: DashboardPage
  },
  {
    path: '/login',
    name: 'login',
    noLayout: true,
    Component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    Component: RegisterPage
  },
  {
    path: '/articles',
    resource: 'articles',
    name: 'articles',
    label: 'Posts',
    model: Article
  },
]

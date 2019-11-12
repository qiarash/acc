import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import store from 'store'
import {getMe} from 'Api'

let AuthHandler = ({location, history, setUserInfo}) => {
  let userToken = store.get('token')
  useEffect(() => {
    if (userToken)
      getMe().then(res => setUserInfo(res.user))
  }, [userToken])
  if (!userToken)
    return <Redirect to="/login"/>
  else if (location.pathname.includes('login') && userToken)
    return <Redirect to="/"/>
  return (null)
}

export default connect(null, {
  setUserInfo: user => ({type: 'USER_INFO', user})
})(AuthHandler)

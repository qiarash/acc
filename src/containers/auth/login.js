import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Form from 'Components/form'
import {loginApi} from 'Api'
import {useAlert} from 'react-alert'
import store from 'store'
import {Wrapper, FormWrapper, StyledSpan} from './styled'



let Login = ({history, setUserInfo}) => {
  let [errorTimeStamp, setErrorTimeStamp] = useState(null)
  const alert = useAlert()
  return (<Wrapper>
    <FormWrapper>
      <Form title="Login" fields={[
          {
            name: 'email',
            placeholder: 'Email',
            type: 'text',
            required: true
          }, {
            name: 'password',
            placeholder: 'Password',
            type: 'password',
            required: true
          }
        ]} errorInResponse={errorTimeStamp}
        submitButtonText='Login'
        submitButtonFullWidth="submitButtonFullWidth"
        onSubmit={payload => loginApi(payload).then(res => {
          setUserInfo(res.user)
          store.set('token', res.user.token)
          history.push('/')
        }).catch(e => {
          if(e.data && e.data.errors){
            alert.show({title: 'Login failed!',
            body: Object.entries(e.data.errors).map(([key, val]) => `${key} ${val}`)},
            {type: 'error'})
          }
          setErrorTimeStamp(new Date())
        })}/>
      <StyledSpan>Don’t have account?</StyledSpan>
      <Link to='/register'>Register Now</Link>
    </FormWrapper>
  </Wrapper>)
}

export default connect(null, {setUserInfo: user => ({type: 'USER_INFO', user})})(Login)

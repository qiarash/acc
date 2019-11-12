import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {registerApi} from 'Api'
import {useAlert} from 'react-alert'
import store from 'store'
import Form from 'Components/form'
import {Wrapper, FormWrapper, StyledSpan} from './styled'

let Register = ({history, setUserInfo}) => {
  let [errorTimeStamp, setErrorTimeStamp] = useState(null)
  const alert = useAlert()

  return (<Wrapper>
    <FormWrapper>
    <Form title="register" fields={[
        {
          name: 'username',
          placeholder: 'User',
          type: 'text',
          required: true
        }, {
          name: 'email',
          placeholder: 'Email',
          type: 'text',
          regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          regexError: 'Email format is incorrect.',
          required: true
        }, {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
          required: true
        }
      ]} errorInResponse={errorTimeStamp}
      submitButtonText='Login'
      submitButtonFullWidth
      onSubmit={payload => registerApi(payload).then(res => {
        store.set('token', res.user.token)
        setUserInfo(res.user)
        history.push('/')
      }).catch(e => {
        if(e.data && e.data.errors){
          alert.show({title: 'Register failed!',
          body: Object.entries(e.data.errors).map(([key, val]) => `${key} ${val}`)},
          {type: 'error'})
        }
        setErrorTimeStamp(new Date())
      })}/>
      <StyledSpan>Already Registered?</StyledSpan><Link to='/login'>Login</Link>
      </FormWrapper>
  </Wrapper>)
}

export default connect(null, {setUserInfo: user => ({type: 'USER_INFO', user})})(Register)

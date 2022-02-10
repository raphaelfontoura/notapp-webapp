import FormCard, { FormLogin } from 'core/components/FormCard'
import { makeRequest } from 'core/utils/apiRequests'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Register = (props: Props) => {

  const navigate = useNavigate();

  const handleSubmit = (data: FormLogin) => {
    makeRequest({url:"/api/v1/users", method:'POST', data})
      .then(_response => {
        navigate("/");
      });
  }

  return (
    <FormCard formTitle='Register User' buttonLabel='Save' onSubmit={handleSubmit}  registerLink={false}/>
  )
}

export default Register
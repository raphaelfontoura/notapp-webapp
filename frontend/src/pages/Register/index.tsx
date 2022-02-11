import FormCard, { FormLogin } from 'core/components/FormCard'
import { makeRequest } from 'core/utils/apiRequests'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type Props = {}

const Register = (props: Props) => {

  const navigate = useNavigate();

  const handleSubmit = (data: FormLogin) => {
    makeRequest({url:"/api/v1/users", method:'POST', data})
      .then(_response => {
        toast.success("User created. Enjoy!");
        navigate("/");
      })
      .catch( (err: Error) => {
        toast.error(err.message);
      });
  }

  return (
    <FormCard formTitle='Register User' buttonLabel='Save' onSubmit={handleSubmit}  registerLink={false}/>
  )
}

export default Register
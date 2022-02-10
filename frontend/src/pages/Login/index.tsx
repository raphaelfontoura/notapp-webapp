import "./styles.css";
import Button from "core/components/Button";
import { makeLogin } from "core/utils/apiRequests";
import { saveSessionData } from "core/utils/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormCard, { FormLogin } from "core/components/FormCard";


const Login = () => {

  const navigate = useNavigate();

  const onSubmit = (data: FormLogin) => {
    makeLogin(data)
      .then(response => {
        // setHasError(false);
        saveSessionData(response.data);
        navigate("/notes");
      })
      .catch(() => {
        // setHasError(true);
        navigate("/");
      })
  }

  return (
    <FormCard formTitle="Log In" buttonLabel="Log in" onSubmit={onSubmit} registerLink={true}/>
  )
};

export default Login;
import "./styles.css";
import { makeLogin } from "core/utils/apiRequests";
import { saveSessionData } from "core/utils/auth";
import { useNavigate } from "react-router-dom";
import FormCard, { FormLogin } from "core/components/FormCard";
import { toast } from "react-toastify";


const Login = () => {

  const navigate = useNavigate();

  const onSubmit = (data: FormLogin) => {
    toast.update("Please wait...")
    makeLogin(data)
      .then(response => {
        saveSessionData(response.data);
        toast.success("You are in... create some notes!");
        navigate("/notes");
      })
      .catch((err: Error) => {
        toast.error(err.message);
        navigate("/");
      })
  }

  return (

    <FormCard formTitle="Log In" buttonLabel="Log in" onSubmit={onSubmit} registerLink={true} />

  )
};

export default Login;
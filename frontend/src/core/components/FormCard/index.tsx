import './styles.css';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { Link } from 'react-router-dom';

type Props = {
  formTitle: string;
  buttonLabel: string;
  onSubmit: (data: FormLogin) => void;
  registerLink?: boolean;
}

export type FormLogin = {
  username: string;
  password: string;
}

const FormCard = ({ formTitle, buttonLabel, onSubmit, registerLink }: Props) => {

  const { register, formState: { errors }, handleSubmit } = useForm<FormLogin>();

  return (
    <form className='container login-form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className="login-title">{formTitle}</h1>
      <div className="label-input-div">
        <label className="input-label">Email Address</label>
        {errors.username && (
          <div className="invalid-feedback">
            {errors.username.message}
          </div>
        )}
        <input
          type="text"
          className="login-input"
          placeholder="myemail@email.com"
          {...register("username",
            {
              required: {
                value: true,
                message: "This field need some a valid email"
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i,
                message: "You email is invalid. Please check this."
              }
            })
          }
        />
      </div>

      <div className="label-input-div">
        <label className="input-label">Password</label>
        {errors.password && (
          <div className="invalid-feedback">
            {errors.password.message}
          </div>
        )}
        <input
          type="password"
          className="login-input"
          placeholder="your password"
          {...register("password", {
            required: {
              value: true,
              message: "Required Field"
            },
            minLength: {
              value: 4,
              message: "Minimum amount of 4 characters"
            }
          })
          }
        />
      </div>

      <span className={`register-link ${registerLink ? "" : "display-none"} `}>
        <Link to={"/register"}>Register new user</Link>
      </span>

      <Button label={buttonLabel} />
    </form>
  )
}

export default FormCard;
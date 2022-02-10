import "./styles.css";

type Props = {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick } : Props) => {

  return (
    <button className="button-default" onClick={onClick}>
      {label}
    </button>
  )
}

export default Button;
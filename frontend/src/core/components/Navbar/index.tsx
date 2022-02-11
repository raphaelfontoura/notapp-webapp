import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css';

const Navbar = () => {

  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUserData = getAccessTokenDecoded();
    setUsername(currentUserData.user_name);
  }, [location])

  const handleLogout = () => {
    logout();
    toast.info("User log out.");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link className="navbar-brand" to={"/notes"}>NotApp</Link>
        <Link to={"notes/new"}>
          <button className={`btn btn-primary ${username ? "" : "display-none"}`} id="btn-new-note">Add</button>
        </Link>
      </div>
      <div onClick={handleLogout} className={`navbar-logout ${username ? "" : "display-none"}`}>
        <span className='login-username'>{username}</span>
        <span className="navbar-logout-text">Logout</span>
      </div>
    </nav >
  )
}

export default Navbar
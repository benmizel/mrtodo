import logo from '../../assets/logo/mrtodo_logo.png';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import UserMenu from '../UserMenu/UserMenu';
import useAuth from '../../hooks/useAuth';
import "./Header.scss";

const Header = ({ logout, setDeleteModalOpen, deleteAccount, isDeleteModalOpen }) => {
  const { user } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  const [isUserReady, setIsUserReady] = useState(false);


    useEffect(() => {
      if (user !== null) {
        setIsUserReady(true); // User is logged in or updated
      } else {
        setIsUserReady(false); // User is not logged in
      }
    }, []);
  

  const handleLogoClick = () => {
    navigate("/");
  };

  if (location.pathname === "/dashboard") {
    return (
      <header className="header">
        <div className="header__logo-cont">
          <img
            className="header__logo"
            src={logo}
            alt="Mr. To Do Logo"
            onClick={handleLogoClick}
          />
        </div>
        <UserMenu 
          user={user} 
          logout={logout} 
          setDeleteModalOpen={setDeleteModalOpen}
          isDeleteModalOpen={isDeleteModalOpen}
          deleteAccount={deleteAccount} 
        />
      </header>
    );
  } else {
    return (
      <header className="header">
        <div className="header__logo-cont">
          <img
            className="header__logo"
            src={logo}
            alt="Mr. To Do Logo"
            onClick={handleLogoClick}
          />
        </div>
      </header>
    );

  }
  

  
};

export default Header;
import logo from '../../assets/logo/mrtodo_logo.png';
import { useNavigate } from "react-router-dom";
import UserMenu from '../UserMenu/UserMenu';
import "./Header.scss";

const Header = ({ user, logout, setDeleteModalOpen, deleteAccount, isDeleteModalOpen }) => {
  let navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  if (!user) {
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
};

export default Header;
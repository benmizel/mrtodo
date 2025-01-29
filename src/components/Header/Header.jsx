import logo from '../../assets/logo/mrtodo_logo.png';
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    let navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/");
      };


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
 
export default Header;
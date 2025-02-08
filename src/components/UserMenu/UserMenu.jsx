import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dropIcon from '../../assets/icons/arrow_drop_down-24px.svg';
import DeleteModal from '../DeleteModal/DeleteModal';

import './UserMenu.scss';

const UserMenu = ({ user, logout, setDeleteModalOpen, deleteAccount, isDeleteModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    
    navigate('/login');
    closeMenu();
    
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
    
    
    closeMenu();
  };

  return (
    <>
      <div className="user-menu">
        <button onClick={toggleMenu} className={`user-menu__button ${isMenuOpen ? 'active' : ''}`}>
        Profile Menu <img src={dropIcon} className="dropdown-icon"/> 
        </button>
        {isMenuOpen && (
          <div className="user-menu__dropdown">
            <button className="user-menu__logout" onClick={handleLogout}>Logout</button>
            <button className="user-menu__delete" onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen} 
        onRequestClose={() => setDeleteModalOpen(false)} 
        onConfirm={async () => {
          await deleteAccount(); 
          setDeleteModalOpen(false);
          navigate('/signup'); 
        }}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </>
  );
};

export default UserMenu;
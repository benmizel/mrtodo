import { useState } from 'react';
import DeleteModal from '../DeleteModal/DeleteModal';

import './UserMenu.scss';

const UserMenu = ({ user, logout, setDeleteModalOpen, deleteAccount, isDeleteModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const handleDeleteAccount = () => {
    setDeleteModalOpen(true);
    closeMenu();
  };

  return (
    <>
      <div className="user-menu">
        <button onClick={toggleMenu} className="user-menu__button">
          {user?.username}
        </button>
        {isMenuOpen && (
          <div className="user-menu__dropdown">
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen} 
        onRequestClose={() => setDeleteModalOpen(false)} 
        onConfirm={async () => {
          await deleteAccount(); 
          setDeleteModalOpen(false); 
        }}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </>
  );
};

export default UserMenu;
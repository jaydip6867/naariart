import React, { useState } from 'react';
import { FiMenu, FiX, FiUser, FiSettings, FiShoppingBag, FiLogOut, FiClipboard } from 'react-icons/fi';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (path, item) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { icon: <MdOutlineSpaceDashboard />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FiUser />, label: 'Customers', path: '/customers' },
    { icon: <FiShoppingBag />, label: 'Orders', path: '/orders' },
    { icon: <FiSettings />, label: 'Team', path: '/team' },
    { icon: <FiClipboard />, label: 'Tasks', path: '/tasks' },
    { icon: <FiSettings />, label: 'Settings', path: '/settings' },
  ];

  const getActiveItem = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.label : 'Dashboard';
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FiX /> : <FiMenu />}
      </button>
      
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="header-content">
            <img src={require('../assets/Naari Art Logo.png')} className="logo" alt="NaariArt Logo" />
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              <FiX />
            </button>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                <button 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.path, item.label)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn">
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;

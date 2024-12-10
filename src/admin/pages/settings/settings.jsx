import { motion } from 'framer-motion';
import { Bell, Lock, Trash2, User } from "lucide-react";
import { useState } from 'react';
import UserImg from "../../assets/profile.webp";
import "./settings.css";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('Vivek Vaishnani');
  const [email, setEmail] = useState('vivekvaishnani464588@gmail.com');
  const [tempName, setTempName] = useState(name);
  const [tempEmail, setTempEmail] = useState(email);
  const [notification, setNotification] = useState({
    push: true,
    email: false,
    sms: true
  });
  const [twoFactor, setTwoFactor] = useState(true);

  // Toggle modal visibility
  const openModal = () => {
    setTempName(name);
    setTempEmail(email);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Save changes
  const handleSave = () => {
    setName(tempName);
    setEmail(tempEmail);
    closeModal();
  };

  const toggleNotification = (type) => {
    setNotification((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  const notificationOptions = [
    { label: 'Push Notification', type: 'push' },
    { label: 'Email Notification', type: 'email' },
    { label: 'SMS Notification', type: 'sms' },
  ];

  return (
    <div className="setting-content-wrapper">
      <div className='profile-section'>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='common-section-header'>
            <User className="icon" size="22" />
            <h2 className='title'>Profile</h2>
          </div>
          <div className='profile-content'>
            <img className='user-img' src={UserImg} alt="Image" />
            <div>
              <h3 className='profile-name'>{name}</h3>
              <p className='profile-email'>{email}</p>
            </div>
          </div>
          <button className='edit-btn' onClick={openModal}>Edit Profile</button>

          {/* Inline Modal for editing profile */}
          {/* {isModalOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, duration: 0.5 }}
            >
              <div>
                <button onClick={closeModal}>
                  <X />
                </button>
                <h2>Edit Profile</h2>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter name"
                />
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  placeholder="Enter email"
                />
                <button onClick={handleSave}>Save Changes</button>
              </div>
            </motion.div>
          )} */}
        </motion.div>
      </div>
      <div className="notification-section">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='common-section-header'>
            <Bell className="icon" size="22" />
            <h2 className='title'>
              Notification
            </h2>
          </div>
          <div>
            {notificationOptions.map(({ label, type }) => (
              <div key={type} className="notification-content">
                <span className="notification-title">{label}</span>
                <div
                  className={`notification-switch ${notification[type] ? 'active' : ''}`}
                  onClick={() => toggleNotification(type)}
                  role="switch"
                  aria-checked={notification[type]}
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') toggleNotification(type);
                  }}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="security-section">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='common-section-header'>
            <Lock className="icon" size="22" />
            <h2 className='title'>
              Security
            </h2>
          </div>
          <div className="notification-content">
            <span className="notification-title">Two Factor Authentication</span>
            <div
              className={`notification-switch ${twoFactor ? 'active' : ''}`}
              onClick={() => setTwoFactor(!twoFactor)}
              role="switch"
              aria-checked={twoFactor}
              tabIndex={0}
            >
              <div className="toggle-knob"></div>
            </div>
          </div>
          <button className='change-password-btn'>Change Password</button>
        </motion.div>
      </div>
      <div className="danger-zone-section">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='common-section-header'>
            <Trash2 className="icon" size="22" />
            <h2 className='title'>
              Security
            </h2>
          </div>
          <p className='dec'>Deleting your account will permanently remove all account data and content. Please confirm if you wish to proceed, as this action cannot be undone.</p>
          <button className='delete-btn'>Delete Account</button>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings;
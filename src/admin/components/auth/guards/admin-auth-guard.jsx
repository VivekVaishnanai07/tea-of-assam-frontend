import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../header/header";
import Sidebar from '../../sidebar/sidebar';

const AdminAuthGuard = ({ component }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      let adminToken = localStorage.getItem('adminToken');;

      if (adminToken) {
        setStatus(true);
      } else {
        setStatus(false);
        navigate('/admin/login');
      }
    } catch (error) {
      setStatus(false);
      navigate('/admin/login');
    }
  };

  return status ?
    <div className='admin-penal-container'>
      <Sidebar />
      <div className='admin-body'>
        <Header />
        {component}
      </div>
    </div>
    : null;
};

export default AdminAuthGuard;

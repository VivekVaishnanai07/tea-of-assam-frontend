import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUnAuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = async () => {
    try {
      let isToken = localStorage.getItem('adminToken');
      if (!isToken) {
        setStatus(true);
      } else {
        setStatus(false);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      navigate('/admin/dashboard');
    }
  };

  return status ? <> {component} </> : null;
};

export default AdminUnAuthGuard;

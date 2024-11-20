import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UnAuthGuard = ({ component: Component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = async () => {
    try {
      let isToken = localStorage.getItem('clientToken');
      if (!isToken) {
        setStatus(true);
      } else {
        setStatus(true);
      }
    } catch (error) {
      navigate('/dashboard');
    }
  };

  return status ? <Component /> : null;
};

export default UnAuthGuard;

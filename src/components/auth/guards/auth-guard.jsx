
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from "../../../context/user-context";

const AuthGuard = ({ component }) => {
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);


  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  const checkToken = async () => {
    try {
      let isToken = localStorage.getItem('clientToken');
      if (!isToken) {
        navigate(`/login`);
      }

      setStatus(true);
      return;
    } catch (error) {
      navigate(`/login`);
    }
  }

  return status ?
    <UserProvider>
      {component}
    </UserProvider> :
    <React.Fragment></React.Fragment>;
}

export default AuthGuard;
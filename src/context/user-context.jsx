import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clientsThunk } from "../store/features/clients/thunk";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  let dispatch = useDispatch();
  let isToken = localStorage.getItem('clientToken');
  let jwtTokenDecode = jwtDecode(isToken);
  let clientDetails = useSelector((state) => state.clients.client)
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (jwtTokenDecode) {
      dispatch(clientsThunk({ clientId: jwtTokenDecode.id }));
    }
  }, [dispatch,]);

  useEffect(() => {
    if (clientDetails) {
      setUser(clientDetails);
    }
  }, [clientDetails]);

  // Function to update user data
  const updateUser = () => {
    if (jwtTokenDecode) {
      dispatch(clientsThunk({ clientId: jwtTokenDecode.id }));
    }
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
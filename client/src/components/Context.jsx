import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();
const Context = ({ children }) => {
  const [user, setUser] = useState(null);
  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/check-auth",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
  
        }
      );
      setUser({ id: response.data.userId });
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Context;

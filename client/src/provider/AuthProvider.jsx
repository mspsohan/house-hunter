import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState();
   const [selectedChat, setSelectedChat] = useState();
   const [notification, setNotification] = useState([]);
   const [chats, setChats] = useState([]);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      setLoading(false);

      if (!userInfo) {
         window.location.href = '/';
      }
   }, []);

   const authInfo = {
      user,
      setUser,
      loading,
      selectedChat,
      setSelectedChat,
      chats,
      setChats,
      notification,
      setNotification,
   };

   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
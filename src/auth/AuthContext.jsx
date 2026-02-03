import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(savedUser);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("blog_users")) || [];

    const foundUser = users.find(function (user) {
  if (user.username === email && user.password === password) {
    return true;   // match mil gaya
  } else {
    return false;  // match nahi mila
  }
});
    if (!foundUser) return false;

    const userData = {
      id: foundUser.id,
      email: foundUser.username,
    };
//localstorage store in the form of string so we use the JSON.stringify
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

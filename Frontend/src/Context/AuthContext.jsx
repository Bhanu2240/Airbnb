import React, { createContext, useState } from 'react';

export const AuthDataContext = createContext();

const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:8000";
  let [loading,setLoading]=useState(false)

  return (
    <AuthDataContext.Provider value={{ serverUrl,loading,setLoading }}>
      {children}
    </AuthDataContext.Provider>
  );
};

export default AuthContext;
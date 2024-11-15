import React, { createContext, useContext } from "react";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(false); // Your auth state logic here
  const [authMessage, setAuthMessage] = React.useState("");
  const [role, setRole] = React.useState("");
  const [welcomeMessage, setWelcomeMessage] = React.useState("");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authMessage,
        setAuthMessage,
        role,
        setRole,
        welcomeMessage,
        setWelcomeMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

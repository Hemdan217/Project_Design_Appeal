import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const StateContext = createContext();

// Initial state values
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

// Context provider component
export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Example function to toggle states (You can add more logic here)
  const toggleChat = () => {
    setState((prevState) => ({ ...prevState, chat: !prevState.chat }));
  };

  return (
    <StateContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);

import React from "react";
import { useContext } from "react";

const AuthContext = React.createContext();

const FAKE_USER = {
  name: "Vitor",
  email: "vitor@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, error: null };
    case "error":
      return { ...state, error: "Credenciais Inválidas, tente novamente!" };
    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

function loginAction(user) {
  return { type: "login", payload: user };
}

function logoutAction() {
  return { type: "logout" };
}

function errorAction() {
  return { type: "error" };
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { user, isAuthenticated, error } = state;

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch(loginAction(FAKE_USER));
    else dispatch(errorAction());
  }

  function logout() {
    dispatch(logoutAction());
  }

  const auth = {
    user,
    error,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuthContext };

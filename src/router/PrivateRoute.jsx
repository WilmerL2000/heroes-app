import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  const { pathname, search } = useLocation();

  /* Saving the last path the user was on before being redirected to the login page. */
  const lastPath = pathname + search;
  localStorage.setItem("lastPath", lastPath);

  /* If logged is true, return children, else return Navigate to "/login" */
  return logged ? children : <Navigate to="/login" />;
};

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";

export const PublicRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);

  /* If the user is not logged in, it will return the children. If the user is logged in, it will
  redirect to the /marvel route. */
  return !logged ? children : <Navigate to="/marvel" />;
};

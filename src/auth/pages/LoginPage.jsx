import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogin = () => {
    /* Getting the last path from local storage. If there is no last path, it will default to the root
    path. */
    const lastPath = localStorage.getItem("lastPath") || "/";

    login("Wilmer Lopez");
    navigate(lastPath, { replace: true });
  };

  return (
    <div className="container mt-5 ">
      <h1>Login</h1>
      <hr />

      <button className="btn btn-primary" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./authReducer";
import { types } from "../types/types";

const init = (state) => {
  /* Getting the user from localStorage and parsing it into a JavaScript object. */
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user,
    user,
  };
};

/**
 * The AuthProvider function is a React component that returns a React Context Provider.
 * @returns The AuthContext.Provider is being returned.
 */
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {}, init);

  /**
   * This function takes a name as an argument, and if no name is provided, it defaults to an empty
   * string. It then creates an action object with a type of login and a payload of an object with an
   * id of ABC and the name that was passed in. It then dispatches that action.
   */
  const login = async (name = "") => {
    const user = { id: "ABC", name };

    const action = { type: types.login, payload: user };

    localStorage.setItem("user", JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem("user");
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

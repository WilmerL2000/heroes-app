import { AuthReducer, types } from "../../../src/auth";

describe("Pruebas en el authReducer", () => {
  test("Debe de retornar el estado por defecto", () => {
    const state = AuthReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("Debe de  (login) llamar al login autenticar y establecer el user", () => {
    const action = {
      type: types,
      payload: { name: "Wilmer", id: "123" },
    };

    const state = AuthReducer({ logged: false }, action);
    // expect(state).toEqual({ logged: true, user: action.payload });
  });

  test("Debe de (logout) borrar el name del usuario y logged en false", () => {
    const state = { logged: true, user: { name: "Wilmer", id: "123" } };
    const action = { type: types.logout };
    const newState = AuthReducer(state, action);
    expect(newState).toEqual({ logged: false });
  });
});

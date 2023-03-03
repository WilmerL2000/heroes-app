import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe("Pruebas en PrivateRoute", () => {
  test("Debe de mostrar el children si  esta auth", () => {
    /* Mocking the localStorage.setItem method. */
    Storage.prototype.setItem = jest.fn();

    const contextValue = { logged: true, user: { name: "Wilmer", id: "123" } };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=bat"]}>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=bat"
    );
  });
});

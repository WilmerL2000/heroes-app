const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter, useNavigate } = require("react-router-dom");
const { AuthContext } = require("../../../src/auth/context/AuthContext");
const { Navbar } = require("../../../src/ui/components/Navbar");

const mockedUseNavigate = jest.fn();

/* Mocking the useNavigate function from react-router-dom. */
jest.mock("react-router-dom", () => ({
  /* A way to mock a module. */
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en Navbar", () => {
  const contextValue = {
    logged: true,
    user: { name: "Wilmer" },
    logout: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el nombre del usuario logueado", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Wilmer")).toBeTruthy();
  });
  test("Debe de llamar el logout y navigate al hacer clic en el boton", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button");
    /* Simulating a click on the logout button. */
    fireEvent.click(logoutBtn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

/* Mocking the useNavigate function from react-router-dom. */
jest.mock("react-router-dom", () => ({
  /* A way to mock a module. */
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("Pruebas en SearchPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrarse correctamente con valores", () => {
    const container = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  test("Debe de mostrar a Batman y el input con el valor de queryString", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");

    const img = screen.getByRole("img");
    expect(img.src).toBe("/assets/heroes/dc-batman.jpg");
  });

  test("Debe de mostrar si no se encuentra el heroe", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText("alert-danger");
    /* Checking that the alert is visible. */
    expect(alert.style.display).toBe("");
  });
  test("Debe de llamar el navigate a la pantalla nueva", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { name: "searchText", value: "superman" },
    });

    const form = screen.getByLabelText("form");
    fireEvent.submit(form);

    /* Checking that the mocked function was called with the value "?q=superman". */
    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=superman");
  });
});

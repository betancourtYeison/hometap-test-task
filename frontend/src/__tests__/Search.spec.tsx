import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../components";

describe("Search Component", () => {
  test("renders input and button", () => {
    render(<Search onChange={() => {}} />);

    const inputElement = screen.getByPlaceholderText(/enter address/i);
    const buttonElement = screen.getByText(/search/i);

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("triggers onChange when a valid address is entered", () => {
    const handleChange = jest.fn();
    render(<Search onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText(/enter address/i);
    fireEvent.change(inputElement, { target: { value: "123 Main St" } });

    const buttonElement = screen.getByText(/search/i);
    fireEvent.click(buttonElement);

    expect(handleChange).toHaveBeenCalledWith("123 Main St");
  });
});

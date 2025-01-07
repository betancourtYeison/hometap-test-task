import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Toast } from "../components";

describe("Toast Component", () => {
  test("render success toast message", () => {
    render(
      <Toast type="success" duration={5} message="Success" onClose={() => {}} />
    );
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });

  test("render error toast message", () => {
    render(
      <Toast type="error" duration={5} message="Error" onClose={() => {}} />
    );
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
  });
});

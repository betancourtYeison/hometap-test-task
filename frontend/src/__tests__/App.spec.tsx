import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";

const queryClient = new QueryClient();

describe("App Component", () => {
  test("renders loading spinner when fetching data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    const searchInput = screen.getByPlaceholderText(/enter address/i);
    fireEvent.change(searchInput, { target: { value: "123 Main St" } });

    const searchButton = screen.getByText(/search/i);
    fireEvent.click(searchButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

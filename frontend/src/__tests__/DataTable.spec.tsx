import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DataTable } from "../components";

const mockData = [
  {
    "1 Square Footage": "2.619",
    "2 Lot Size (Acress)": 0.21,
    "3 Year Built": 1952,
    "4 Property Type": "Condo",
    "5 Bedrooms": 5,
    "6 Bathrooms": 4,
    "7 Room Count": 8,
    "8 Septic System": true,
    "9 Sale Price": "$192.327",
  },
  {
    "1 Square Footage": "2.619",
    "2 Lot Size (Acress)": 0.21,
    "3 Year Built": 1952,
    "4 Property Type": "Condo",
    "5 Bedrooms": 5,
    "6 Bathrooms": 4,
    "7 Room Count": 8,
    "8 Septic System": true,
    "9 Sale Price": "$192.327",
  },
];

describe("DataTable Component", () => {
  test("renders table with data", () => {
    render(<DataTable data={mockData} />);

    expect(screen.getByText(/Square Footage/i)).toBeInTheDocument();
    expect(screen.getByText(/Sale Price/i)).toBeInTheDocument();
  });

  test("renders 'No data available' when data is empty", () => {
    render(<DataTable data={[]} />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});

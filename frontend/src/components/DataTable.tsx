import styled from "styled-components";
import { ProviderData } from "../models/provider";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

const Th = styled.th`
  border: 1px solid #1f3861;
  padding: 8px;
  text-align: left;
  background-color: #6e57db;
  color: #fff;
`;

const Td = styled.td`
  border: 1px solid #1f3861;
  padding: 8px;
  text-align: left;
`;

const Label = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #20a277;
`;

interface DataTableProps {
  data: ProviderData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  if (!data || data.length === 0) {
    return <Label>No data available.</Label>;
  }

  const keys = Object.keys(data[0]);
  keys.sort((a, b) => {
    const numA = parseInt(a.split(" ")[0], 10);
    const numB = parseInt(b.split(" ")[0], 10);
    return numA - numB;
  });

  const handleValue = (item: ProviderData, key: string) => {
    switch (typeof item[key]) {
      case "boolean":
        return item[key] ? "Yes" : "No";
      case "number":
        return parseFloat(String(item[key]));
      default:
        return String(item[key]);
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <Th></Th>
          {data.map((_, index) => (
            <Th key={index}>Provider {index + 1}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {keys.map((key) => (
          <tr key={key}>
            <Td>{key.slice(2)}</Td>
            {data.map((item, index) => (
              <Td key={index}>{handleValue(item, key)}</Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

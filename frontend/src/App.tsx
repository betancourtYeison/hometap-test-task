import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import hometapLogo from "./assets/hometap.svg";
import "./App.css";

import { DataTable, Loader, Search, Toast } from "./components";

function App() {
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, error, data } = useQuery({
    enabled: address.length > 0,
    queryKey: ["provider", address],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/providers?address=${address}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (error) setErrorMessage(error.message);
  }, [error]);

  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && (
        <Toast
          type="error"
          duration={10}
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      <a href="https://www.hometap.com" target="_blank">
        <img src={hometapLogo} className="logo" alt="Hometap logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <Search onChange={(address: string) => setAddress(address)} />
      {data && <DataTable data={data.providers} />}
      <p className="read-the-docs">Developed by Yeison Betancourt Solis</p>
    </>
  );
}

export default App;

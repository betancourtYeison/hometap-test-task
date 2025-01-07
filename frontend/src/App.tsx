import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import hometapLogo from "./assets/hometap.svg";
import "./App.css";

import { DataTable, Loader, Toast } from "./components";

function App() {
  const { isPending, error, data } = useQuery({
    queryKey: ["provider"],
    queryFn: async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const url = `${apiUrl}/api/providers?address=123 Main St, Anytown, USA`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) setErrorMessage(error.message);
  }, [error, data]);

  return (
    <>
      {isPending && <Loader />}
      {errorMessage && (
        <Toast
          type="error"
          duration={10}
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      <div>
        <a href="https://www.hometap.com" target="_blank">
          <img src={hometapLogo} className="logo" alt="Hometap logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">{data && <DataTable data={data.providers} />}</div>
      <p className="read-the-docs">Developed by Yeison Betancourt Solis</p>
    </>
  );
}

export default App;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import hometapLogo from "./assets/hometap.svg";
import "./App.css";

import { Loader, Toast } from "./components";

function App() {
  const { isPending, error } = useQuery({
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
  }, [error]);

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
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

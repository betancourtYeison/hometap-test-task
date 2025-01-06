import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
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

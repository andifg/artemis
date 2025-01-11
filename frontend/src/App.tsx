import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Dashboard } from "./routes/Dashboard.tsx";
import Hello from "./routes/Hello.tsx";
import { useAuthentication } from "./hooks/useAuthentication.tsx";

const App = () => {
  useAuthentication();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Hello />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };

import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Dashboard } from "./routes/Dashboard.tsx";
import { List } from "./routes/List.tsx";
import Hello from "./routes/Hello.tsx";
import { Account } from "./routes/Account.tsx";
import { Trophys } from "./routes/Trophys.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/list" element={<List />} />
        <Route path="/trophys" element={<Trophys />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<Hello />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };

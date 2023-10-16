import Dashboard from "./pages/Dashboard";
import Nasabah from "./pages/Nasabah";
import Rekening from "./pages/Rekening";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/nasabah" element={<Nasabah />} />
          <Route path="/rekening" element={<Rekening />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

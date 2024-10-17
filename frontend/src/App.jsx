import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AdminLogin from "../pages/AdminLogin";
import AdminHome from "../pages/AdminHome";
import ProtectedRoutes from "../utils/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*users can go to these pages without bening authenticated */}
        <Route element={<Home />} path="/" />
        <Route element={<AdminLogin />} path="admin" />
        <Route element={<ProtectedRoutes />}>
          {/*pages unavalible until user is authenticated*/}
          <Route element={<AdminHome />} path="/adminHome" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminReports from "./pages/AdminReports.jsx";
import Dining from "./pages/Dining.jsx";
import Events from "./pages/Events.jsx";
import Rides from "./pages/Rides.jsx";

import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import AdminEmployee from "./pages/AdminEmployee.jsx";
import Ticket from "./pages/Ticket.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*users can go to these pages without bening authenticated */}
        <Route element={<Home />} path="/" />
        <Route element={<Dining />} path="/dining" />
        <Route element={<Rides />} path="/rides" />
        <Route element={<Events />} path="/events" />
        <Route element={<AdminLogin />} path="admin" />
        <Route element={<Ticket />} path="ticket" />
        <Route element={<ProtectedRoutes />}>
          {/*pages unavalible until user is authenticated*/}
          <Route element={<AdminReports />} path="/admin/reports" />
          <Route element={<AdminEmployee />} path="/admin/employees" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

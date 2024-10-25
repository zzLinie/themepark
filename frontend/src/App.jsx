import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminReports from "./pages/AdminReports.jsx";
import Dining from "./pages/Dining.jsx";
import Events from "./pages/Events.jsx";
import Rides from "./pages/Rides.jsx";

import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import AdminEmployee from "./pages/AdminEmployee.jsx";
import Employees from "./pages/Employees.jsx";
import EmployeeRestaurant from "./pages/EmployeeRestaurant.jsx";
import EmployeeShop from "./pages/EmployeeShops.jsx";
import EmployeeRides from "./pages/EmployeeRides.jsx";
import EmployeeEvents from "./pages/EmployeeEvents.jsx";
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
        <Route element={<ProtectedRoutes />}>
          <Route element={<Ticket />} path="ticket" />
          {/*pages unavalible until user is authenticated*/}
          <Route element={<AdminReports />} path="/admin/reports" />
          <Route element={<AdminEmployee />} path="/admin/employees" />
          <Route element={<Employees />} path="employees" />
          <Route element={<EmployeeRestaurant />} path="employees/restaurant" />
          <Route element={<EmployeeShop />} path="employees/shops" />
          <Route element={<EmployeeRides />} path="employees/rides" />
          <Route element={<EmployeeEvents />} path="employees/events" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

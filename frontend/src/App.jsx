import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminReports from "./pages/AdminReports.jsx";
import AdminHome from "./pages/Home.jsx"; /*line to define adminhome reference */
import Dining from "./pages/Dining.jsx";
import Events from "./pages/Events.jsx";
import Rides from "./pages/Rides.jsx";


import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import AdminEmployee from "./pages/AdminEmployee.jsx";
import AdminParkstatus from "./pages/AdminParkstatus.jsx";
import Employees from "./pages/Employees.jsx";
import GiftShopForm from "./pages/GiftShopForm.jsx";
import TicketForm from "./pages/TicketForm.jsx";
import RideForm from "./pages/RidesForm.jsx";
import SpecialEventForm from "./pages/SpecialEventForm.jsx";
import RestaurantForm from "./pages/DiningCardForm.jsx";

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
        <Route element={<TicketForm />} path="/ticket" />
        <Route element={<ProtectedRoutes />}>
          {/*pages unavalible until user is authenticated*/}
          <Route element={<AdminReports />} path="/admin/reports" />
          <Route element={<AdminEmployee />} path="/admin/employees" />
          <Route element={<AdminParkstatus />} path="/admin/parkstatus" />
          <Route element={<Employees />} path="employees" />
          <Route element={<GiftShopForm />} path="employees/shop" />
          <Route element={<SpecialEventForm />} path="employees/events" />
          <Route element={<RestaurantForm />} path="employees/restaurant" />
          <Route element={<RideForm />} path="employees/ride" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminReports from "./pages/AdminReports.jsx";
// import AdminHome from "./pages/Home.jsx"; /*line to define adminhome reference */
import Dining from "./pages/Dining.jsx";
import Shops from "./pages/GiftShops.jsx";
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
import EmployeeLogin from "./pages/EmployeeLogin.jsx";
import { useEffect, useState } from "react";

export default function App() {
  const [auth, setAuth] = useState(false); // Authentication state

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("http://localhost:3000/verify", {
        credentials: "include",
      });
      const data = await response.json();
      setAuth(data.Verify); // Set auth state based on the response
    };

    checkAuth(); // Initial check on mount
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/*users can go to these pages without bening authenticated */}
        <Route element={<Home />} path="/" />
        <Route element={<Dining />} path="/dining" />
        <Route element={<Shops />} path="/giftshops" />
        <Route element={<Rides />} path="/rides" />
        <Route element={<Events />} path="/events" />
        <Route element={<AdminLogin authProp={setAuth} />} path="admin" />
        <Route element={<TicketForm />} path="/ticket" />
        <Route element={<EmployeeLogin />} path="employees/login" />
        <Route element={<ProtectedRoutes auth={auth} />}>
          {/*pages unavalible until user is authenticated*/}
          <Route element={<AdminReports />} path="/admin/reports" />
          <Route element={<AdminEmployee />} path="/admin/employees" />
          <Route element={<AdminParkstatus />} path="/admin/parkstatus" />
          <Route element={<Employees />} path="employees" />
          <Route element={<GiftShopForm />} path="employees/shop" />
          <Route element={<SpecialEventForm />} path="employees/events" />
          <Route element={<RideForm />} path="employees/ride" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

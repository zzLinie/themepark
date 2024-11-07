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
import Login from "./pages/Login.jsx";

export default function App() {
  const [auth, setAuth] = useState(false); // Authentication state

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(
        "https://themepark-server.vercel.app/verify",
        {
          credentials: "include",
        }
      );
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
        <Route
          element={<AdminLogin authProp={setAuth} />}
          path="/login/admin"
        />
        <Route element={<TicketForm />} path="/ticket" />
        <Route element={<EmployeeLogin />} path="/login/employee" />
        <Route element={<Login />} path="/login" />
        <Route element={<ProtectedRoutes auth={auth} />}>
          <Route element={<AdminReports />} path="/login/admin/reports" />
          <Route element={<AdminEmployee />} path="/login/admin/employees" />
          <Route element={<AdminParkstatus />} path="/login/admin/parkstatus" />
          <Route element={<Employees />} path="/login/employees/dashboard" />
          <Route element={<GiftShopForm />} path="/login/employees/shop" />
          <Route
            element={<SpecialEventForm />}
            path="/login/employees/events"
          />
          <Route element={<RideForm />} path="/login/employees/ride" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

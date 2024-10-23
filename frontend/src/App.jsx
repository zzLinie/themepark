import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import Dining from "./pages/Dining.jsx";
import Events from "./pages/Events.jsx";
import Rides from "./pages/Rides.jsx";
import Test from "./pages/Test.jsx";

import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";

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
        <Route element={<Test />} path="/test" />
        <Route element={<ProtectedRoutes />}>
          {/*pages unavailible until user is authenticated*/}
          <Route element={<AdminHome />} path="/adminHome" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

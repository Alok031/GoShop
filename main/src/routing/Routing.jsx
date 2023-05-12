import "../App.css";
import Register from "../Component/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../Component/Index";
import Homepage from "../Component/Homepage";
import Vegies from "../Component/card/Vegies";
import MyOrder from "../Component/order/MyOrder";
import Add from "../Component/Add";
import RequireAuth1 from './RequireAuth1';
import PersistLogin from '../persist/PersistLogin';
import RequireAuth2 from './RequireAuth2';
import PersistLogin1 from '../persist/PersistLogin1';
import { AuthProvider } from "../context/AuthProvider";
import Admin from "../Component/admin/Admin";
import AdminPanel from "../Component/admin/AdminPanel";
import AdminRegister from "../Component/register/AdminRegister"

function Routing() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/admin" element={<Admin />} />
              <Route exact path="/adminregister" element={<AdminRegister />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth1 />}>
                <Route exact path="/index" element={<Index />} />
                <Route exact path="/vegies" element={<Vegies />} />
                <Route exact path="/myorder" element={<MyOrder />} />
                <Route exact path="/add" element={<Add />} />
              </Route>
            </Route>
            <Route element={<PersistLogin1 />}>
              <Route element={<RequireAuth2 />}>
                <Route exact path="/adminpanel" element={<AdminPanel />} />
                {/* <Route exact path="/vegies" element={<Vegies />} />
                <Route exact path="/myorder" element={<MyOrder />} />
                <Route exact path="/add" element={<Add />} /> */}
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default Routing;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/public/Profile";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Analytics from "./pages/dashboard/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PRIVATE */}
        <Route path="/dashboard" element={<Dashboard />} />
<Route path="/dashboard/analytics" element={<Analytics />} />

        {/* 🌐 PUBLIC PROFILE (WAJIB PAKE PREFIX /u) */}
        <Route path="/u/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
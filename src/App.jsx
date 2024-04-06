import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login.jsx";
import Profile from "./component/Profile/Profile.jsx";
import Header from "./component/Profile/header.jsx";
import Rate from "./component/rate/Rate.jsx";
import Profiles from "./component/Profile/Profiles.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/search" element={<Header />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profiles/:userId" element={<Profiles />} />
        <Route path="/header" element={<Header />} />
        <Route path="/other" element={<Rate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

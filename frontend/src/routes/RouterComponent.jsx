import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import Favorites from "../pages/Favorites";

function RouterComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="movie/:id" element={<MovieDetail />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  );
}

export default RouterComponent;

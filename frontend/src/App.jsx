import React, { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts Components Imports
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";

// Pages
import Home from "./components/pages/Home/Home";

// import web font loader
import WebFont from "webfontloader";


const App = () => {
  // UseEffect for Fonts
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home/ >} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App

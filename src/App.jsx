import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StickyNavBar from "./layout/StickyNavBar";

import { UserContext } from "./context/UserContext";
import { AlertContext } from "./context/AlertPopUpContext";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Footer from "./layout/Footer";

import { initializeApp } from "firebase/app";

import firebaseConfig from "./config/FIrebaseConfig";
import AlertPopUp from "./layout/AlertPopUp";

// config of firebase app
initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <AlertContext.Provider value={{ show, setShow }}>
            <StickyNavBar></StickyNavBar>
            <AlertPopUp></AlertPopUp>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route path="/signin" element={<Signin></Signin>}></Route>
              <Route path="*" Component={<PageNotFound></PageNotFound>}></Route>
            </Routes>
            <Footer></Footer>
          </AlertContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}
export default App;

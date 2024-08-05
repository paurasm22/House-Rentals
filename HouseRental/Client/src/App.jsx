import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppContext from "./Context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ShowListings from "./Components/ShowListings";
import ListingDetail from "./Components/ListingDetail";
import MyListings from "./Components/MyListings";
import Addpost from "./Components/Addpost";
import Profile from "./Components/Profile";
import UpdateProfile from "./Components/UpdateProfile";
import Subnavbar from "./Components/Subnavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Likedposts from "./Components/Likedposts";
import Footer from "./Components/Footer";
function App() {
  const a = useContext(AppContext);

  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        {/* <Subnavbar /> */}
        <Routes>
          <Route path="/" element={<ShowListings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/details/:id" element={<ListingDetail />} />
          <Route path="/mylisting" element={<MyListings />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/likedposts" element={<Likedposts />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;

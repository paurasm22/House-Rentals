import React, { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Logo from "../assets/cropped.jpeg";
const Navbar = () => {
  const { authenticated, setisAuthenticated, handleSearch } =
    useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query); // Update context with search query
  };
  // Function to handle logout
  const handleLogout = () => {
    setisAuthenticated(false);
    localStorage.removeItem("token"); // Remove token from local storage
    toast.error("Logged OUT !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigate("/login");
    // Navigate to login page
  };

  // Function to handle login button click
  const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="containers bg-yellow-500 h-17 min-w-full ">
      <div className="flex justify-between align-middle">
        <h1
          className="flex justify-center align-middle ml-5 cursor-pointer "
          onClick={() => navigate("/")}
        >
          <span>
            <img
              src={Logo}
              alt="LOGO"
              className="h-10 mt-1 w-auto mr-1 min-w-10"
            />
          </span>{" "}
          Rentals
        </h1>
        <div className="input flex justify-center align-middle">
          <input
            type="search"
            name=""
            id=""
            placeholder=" Search Something"
            onChange={handleSearchChange}
            className="flex justify-center align-middle h-3/4 m-auto  w-70  placeholder:p-1 lg:w-80 pl-5"
          />
        </div>
        <div className="options grid grid-cols-3 mr-4 ml-4 gap-5">
          <button
            title="My Listings"
            onClick={() => {
              navigate("/mylisting");
            }}
            className="hover:bg-yellow-700"
          >
            <span className="material-symbols-outlined">list_alt</span>
          </button>
          <button
            title="My Profile"
            className="hover:bg-yellow-700"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          {authenticated ? (
            <button
              onClick={handleLogout}
              title="Log Out"
              className="hover:bg-yellow-700"
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              title="Log In"
              className="hover:bg-yellow-700"
            >
              <span
                style={{ backgroundColor: "green" }}
                className="material-symbols-outlined"
              >
                login
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const url = "http://localhost:1000/api";
  const handleInfoClick = () => {
    navigate("/likedposts");
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen p-4 flex-col">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            User Name
          </label>
          <input
            type="text"
            id="username"
            value={profile?.user?.name}
            readOnly
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={profile.user.email}
            readOnly
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700"
          />
        </div>
      </div>
      <button
        onClick={() => navigate("/updateprofile")}
        className="btn btn-warning flex justify-center align-middle mt-8 shadow-xl"
      >
        Update Profile
      </button>
      <div
        id="floating-info-button"
        onClick={handleInfoClick}
        title="View Liked Posts"
      >
        <strong>
          <span className="material-symbols-outlined mt-2">favorite</span>
        </strong>
      </div>
    </div>
  );
};

export default Profile;

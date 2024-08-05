import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/AppContext";
import axios from "axios";

const UpdateProfile = () => {
  const { token } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const url = "http://localhost:1000/api";

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
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.put(
        `${url}/user/updatepassword`,
        {
          email: profile.user.email,
          currentPassword: prevPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccess(response.data.message);
        setError("");
        setPrevPassword("");
        setNewPassword("");
      } else {
        setError(response.data.message);
        setSuccess("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("An error occurred while updating the password.");
    }
  };

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
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
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
            value={profile?.user.name}
            readOnly
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <label
            htmlFor="prevPassword"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Previous Password
          </label>
          <input
            type="password"
            id="prevPassword"
            value={prevPassword}
            onChange={(e) => setPrevPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <button
          onClick={handleUpdatePassword}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;

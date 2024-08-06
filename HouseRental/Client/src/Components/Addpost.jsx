import React, { useContext, useState } from "react";
import axios from "axios";
import AppContext from "../Context/AppContext";
import { Bounce, toast } from "react-toastify";

const Addpost = () => {
  const { token } = useContext(AppContext);
  const [formData, setFormData] = useState({
    roomnos: "",
    place: "",
    address: "",
    landmark: "",
    carpetArea: "",
    rent: "",
    deposit: "",
    featuamini: "",
    contact: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key === "images") {
        for (const file of formData.images) {
          formDataToSend.append("images", file);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:1000/api/post/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      toast.success("Post  Created Sucessfully !!", {
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
      console.log(response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-yellow-200">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="flex flex-col">
          <label htmlFor="roomnos" className="text-lg font-medium mb-2">
            Room No
          </label>
          <input
            type="text"
            id="roomnos"
            name="roomnos"
            value={formData.roomnos}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="place" className="text-lg font-medium mb-2">
            Place
          </label>
          <select
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          >
            {/* Add your options here */}
            <option value="">Select a place</option>
            <option value="panvel">Panvel</option>
            <option value="nerul">Nerul </option>
            <option value="kharghar">Kharghar</option>
            <option value="cbd">CBD</option>
            <option value="vashi">Vashi</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-lg font-medium mb-2">
            Address (Detailed)
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="landmark" className="text-lg font-medium mb-2">
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="carpetArea" className="text-lg font-medium mb-2">
            Carpet Area
          </label>
          <input
            type="text"
            id="carpetArea"
            name="carpetArea"
            value={formData.carpetArea}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rent" className="text-lg font-medium mb-2">
            Rent
          </label>
          <input
            type="text"
            id="rent"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="deposit" className="text-lg font-medium mb-2">
            Deposit
          </label>
          <input
            type="text"
            id="deposit"
            name="deposit"
            value={formData.deposit}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label htmlFor="featuamini" className="text-lg font-medium mb-2">
            Features
          </label>
          <textarea
            id="featuamini"
            name="featuamini"
            value={formData.featuamini}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            rows="3"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contact" className="text-lg font-medium mb-2">
            Contact
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label htmlFor="images" className="text-lg font-medium mb-2">
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2"
            accept="image/*"
            required
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addpost;

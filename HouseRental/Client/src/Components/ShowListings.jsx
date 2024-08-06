import React, { useContext, useState } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import Subnavbar from "./Subnavbar";

const ShowListings = () => {
  const baseURL = "http://localhost:1000";
  const { listings, searchQuery, addLike } = useContext(AppContext);
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredListings = listings
    .filter((homes) => {
      if (filter === "All") return true;
      if (filter.startsWith("Below")) {
        const price = parseInt(filter.split(" ")[1]);
        return homes.rent <= price;
      }
      return homes.place.toLowerCase() === filter.toLowerCase();
    })
    .filter((homes) =>
      homes.place.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleInfoClick = () => {
    navigate("/addpost");
  };
  const handleLikeClick = (postId) => {
    addLike(postId);
  };
  return (
    <div className=" w-full shadow-2xl ">
      <Subnavbar onFilterChange={handleFilterChange} />
      <div className=" container cards flex justify-center align-middle flex-wrap gap-3 lg:grid lg:grid-cols-3 lg:place-items-center lg:justify-center shadow-2xl ">
        {filteredListings.map((homes) => (
          <div className="mt-6 shadow-2xl drop-shadow-xl" key={homes._id}>
            <div className="card cursor-pointer" style={{ width: "18rem" }}>
              <img
                src={`${baseURL}${homes.images[0]}`}
                className="card-img-top h-60 w-45 cursor-pointer"
                alt=""
                onClick={() => {
                  navigate(`/details/${homes._id}`);
                }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {homes.roomnos} BHK in {homes.place}
                </h5>
                <p className="card-text">Rent : ₹ {homes.rent}</p>
              </div>
              <div className="card-body">
                <a
                  onClick={() => handleLikeClick(homes._id)}
                  className="card-link btn btn-warning mx-auto shadow-lg"
                >
                  <span className="material-symbols-outlined ">favorite</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        id="floating-info-button"
        onClick={handleInfoClick}
        title="Create New Post"
      >
        <strong>+</strong>
      </div>
    </div>
  );
};

export default ShowListings;

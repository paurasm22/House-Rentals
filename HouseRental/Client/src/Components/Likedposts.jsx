import React, { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const LikedPosts = () => {
  const { likedPosts, fetchLikedPosts, deleteLikedPost } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLikedPosts(); // Fetch liked posts when component mounts
  }, [fetchLikedPosts]);

  const baseURL = "http://localhost:1000";

  return (
    <div className="w-full">
      <div className="container cards flex justify-center align-middle flex-wrap gap-3 lg:grid lg:grid-cols-3 lg:place-items-center lg:justify-center">
        {likedPosts.map((post) => (
          <div className="mt-6" key={post._id}>
            <div className="card cursor-pointer" style={{ width: "18rem" }}>
              <img
                src={`${baseURL}${post.images[0]}`}
                className="card-img-top h-60 w-45 cursor-pointer"
                alt=""
                onClick={() => {
                  navigate(`/details/${post._id}`);
                }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {post.roomnos} BHK in {post.place}
                </h5>
                <p className="card-text">Rent: ₹ {post.rent}</p>
              </div>
              <div className="card-body flex-auto">
                {/* <a className="card-link btn btn-warning mx-auto">
                  <span className="material-symbols-outlined">favorite</span>
                </a> */}
                <button
                  className="card-link btn btn-danger mx-auto ml-3"
                  onClick={() => deleteLikedPost(post._id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedPosts;

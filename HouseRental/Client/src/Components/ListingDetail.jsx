import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppContext from "../Context/AppContext";

const ListingDetail = () => {
  const baseURL = "http://localhost:1000";
  const { id } = useParams();
  const { token } = useContext(AppContext);
  const [listing, setListing] = useState(null);
  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const api = await axios.get(`${url}/post/getparticularpost/${id}`, {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        console.log("A particular listing", api.data);
        setListing(api.data); // Set the listing data
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing(); // Fetch the listing data when component mounts or `id` changes
  }, [id, token]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <center>
        <h1 className="mt-3">Property Details</h1>
      </center>
      <div className="container lg:flex  lg:justify-center lg:align-middle gap-9">
        <div
          id="carouselExampleIndicators"
          className="carousel slide mt-7 w-100 h-100 lg:mt-14"
        >
          <div className="carousel-indicators">
            {listing.images.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {listing.images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`${baseURL}${image}`}
                  className="d-block w-100 h-100"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div
          className="detailtable lg:w-1/2 "
          style={{ margin: "0 auto", width: "80%", marginTop: "40px" }}
        >
          <table
            className="table table-success table-striped"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Place</th>
                <td>{listing.place}</td>
              </tr>
              <tr>
                <th scope="row"> Detailed Address</th>
                <td>{listing.address}</td>
              </tr>
              <tr>
                <th scope="row">Landmark</th>
                <td>{listing.landmark}</td>
              </tr>
              <tr>
                <th scope="row">Number of Rooms</th>
                <td>{listing.roomnos}</td>
              </tr>
              <tr>
                <th scope="row">Carpet Area</th>
                <td>{listing.carpetArea}</td>
              </tr>

              <tr>
                <th scope="row"> Security Deposit</th>
                <td>{listing.deposit}</td>
              </tr>
              <tr>
                <th scope="row">Rent</th>
                <td>{listing.rent}</td>
              </tr>
              <tr>
                <th scope="row">Features & Ammenities </th>
                <td>{listing.featuamini}</td>
              </tr>

              <tr>
                <th scope="row">Contact Number</th>
                <td>{listing.contact}</td>
              </tr>
              {/* <tr>
                <th scope="row">User ID</th>
                <td>{listing.user}</td>
              </tr> */}
              <tr>
                <th scope="row">Created At</th>
                <td>{new Date(listing.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListingDetail;

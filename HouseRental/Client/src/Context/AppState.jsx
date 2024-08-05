import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
const AppState = (props) => {
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setisAuthenticated(true);
    }
    fetchLikedPosts();
    fetchListings();
  }, []);
  useEffect(() => {
    fetchListings();
  }, []);
  const url = "http://localhost:1000/api";
  const [authenticated, setisAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [listings, setListings] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add search query state

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );

    console.log("user Login", api.data);
    // console.log("Is admin", api.data.admin);
    // localStorage.setItem("admin", api.data.admin);
    // setAdmin(api.data.admin);
    setToken(api.data.token);
    localStorage.setItem("token", api.data.token);
    setisAuthenticated(true);
    fetchLikedPosts();
    // alert(
    //   "This is not a final build .Many bugs are yet to be fixed ! Reload Page if problem loading data . Press OK to continue "
    // );
    return api.data;
  };

  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    // alert(api.data.message);
    // toast.success(api.data.message, {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    //   transition: Bounce,
    // });
    console.log("user registered", api);
    return api.data;
  };

  const fetchListings = async () => {
    const api = await axios.get(`${url}/post/getposts`, {
      headers: {
        "Content-Type": "Application/json",
      },
      withCredentials: true,
    });
    setListings(api.data);
    console.log(api.data);
    // setProducts(api.data.products);
    // setFilteredData(api.data.products);
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const fetchLikedPosts = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${url}/user/likedposts`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: `${token}`,
        },
        withCredentials: true,
      });
      setLikedPosts(response.data.likedPosts || []);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
    }
  };

  const addLike = async (postId) => {
    if (!token) return;

    try {
      await axios.post(
        `${url}/user/like`,
        { postId },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: `${token}`,
          },
          withCredentials: true,
        }
      );
      fetchLikedPosts();
      toast.success(" Added to Liked Posts !!", {
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
      // Refresh liked posts after adding a new like
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  const deleteLikedPost = async (postId) => {
    try {
      await axios.post(
        `${url}/user/unlike`,
        { postId },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: `${token}`,
          },
          withCredentials: true,
        }
      );
      // Remove the post from the local state
      setLikedPosts(likedPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting liked post:", error);
    }
  };
  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };
  return (
    <AppContext.Provider
      value={{
        login,
        register,
        authenticated,
        token,
        setisAuthenticated,
        listings,
        searchQuery,
        handleSearch,
        addLike,
        likedPosts,
        fetchLikedPosts,
        deleteLikedPost,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

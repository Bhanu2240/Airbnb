import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ListingDataContext = createContext();

const ListingContext = ({ children }) => {

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [category, setCategory] = useState("");
  let [adding, setAdding] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newlistData, setNewListData] = useState([]);
  let [cardDetails, setCardDetais] = useState(null);

  let serverUrl = "http://localhost:8000";
  let navigate = useNavigate()

  const handleAddListing = async () => {
    setAdding(true)
    try {
      if (!title || !description || !rent || !city || !category) {
        alert("Please fill all fields");
        return;
      }

      let formData = new FormData();
      formData.append("title", title);
      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);

      let result = await axios.post(
        serverUrl + "/api/listing/add",
        formData,
        {
          withCredentials: true,

        }
      );
      setAdding(false)

      console.log(result);
      alert("Listing Added Successfully");

      setTitle("")
      setDescription("")
      setFrontEndImage1(null)
      setFrontEndImage2(null)
      setFrontEndImage3(null)
      setBackEndImage1(null)
      setBackEndImage2(null)
      setBackEndImage3(null)
      setRent("")
      setCity("")
      setLandmark("")
      setCategory("")
    } catch (error) {
      setAdding(false)
      console.log(error);
      alert("Error adding listing");
    }
  };
  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(serverUrl + `/api/listing/findlistingbyid/${id}`, { withCredentials: true })
      console.log(result.data)
      setCardDetais(result.data)
      navigate("/viewcard")
    } catch (error) {

      console.log(error)

    }
  }

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", { withCredentials: true })
      setListingData(result.data)
      setNewListData(result.data)

    } catch (error) {
      console.log(error)

    }
  }
  useEffect(() => {
    getListing()

  }, [])

  let value = {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    handleAddListing,
    adding, setAdding,
    listingData, setListingData,
    newlistData, setNewListData,
    getListing,
    handleViewCard,
    cardDetails, setCardDetais
  };

  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  );
};

export default ListingContext;
import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";

import axios from "axios";

const serverUrl = "http://localhost:8000"; // change if needed

const ViewCard = () => {
  let navigate = useNavigate()
  let { cardDetails ,getListing} = useContext(ListingDataContext)
  let { userData } = useContext(userDataContext)

  let [updatepopup, setupdatepopup] = useState(false)

  let [title, setTitle] = useState(cardDetails.title);
  let [description, setDescription] = useState(cardDetails.description);
  let [category, setCategory] = useState(cardDetails.category);
  let [rent, setRent] = useState(cardDetails.rent);
  let [city, setCity] = useState(cardDetails.city);
  let [landmark, setLandmark] = useState(cardDetails.landmark);

  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);

  const handleUpdateListing = async (e) => {
  e.preventDefault();

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
      `${serverUrl}/api/listing/update/${cardDetails.id}`,
      formData,
      { withCredentials: true }
    );

    alert("Listing Updated Successfully");
    setupdatepopup(false);
    await getListing();
    window.location.reload();

  } catch (error) {
    console.log(error);
    alert("Error updating listing");
  }
}
const handleDelete = async () => {
  try {
    let confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await axios.delete(
      `${serverUrl}/api/listing/delete/${cardDetails.id}`,
      { withCredentials: true }
    );

    alert("Listing Deleted");
    await getListing();
    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Delete failed");
  }
};

  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>

      {/* Back Button */}
      <div
        className='w-[45px] h-[45px] bg-red-500 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center'
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className='w-[20px] h-[20px] text-white' />
      </div>

      {/* Location */}
      <div className='w-[95%] md:w-[80%] mb-[10px]'>
        <h1 className='text-[20px] md:text-[30px] text-[#272727]'>
          {`In ${cardDetails?.landmark?.toUpperCase()}, ${cardDetails?.city?.toUpperCase()}`}
        </h1>
      </div>

      {/* Images */}
      <div className='w-[95%] h-[400px] flex flex-col md:flex-row md:w-[80%]'>
        <div className='w-full md:w-[70%] h-[65%] md:h-full border bg-gray-200'>
          {cardDetails?.image1 && (
            <img src={cardDetails?.image1} alt="" className='w-full h-full object-cover' />
          )}
        </div>

        <div className='w-full md:w-[30%] h-[30%] md:h-full flex md:flex-col'>
          <div className='w-full h-full border bg-gray-200'>
            {cardDetails?.image2 && (
              <img src={cardDetails?.image2} alt="" className='w-full h-full object-cover' />
            )}
          </div>
          <div className='w-full h-full border bg-gray-200'>
            {cardDetails?.image3 && (
              <img src={cardDetails?.image3} alt="" className='w-full h-full object-cover' />
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[22px] font-semibold'>
        {`${cardDetails?.title?.toUpperCase()}, ${cardDetails?.category?.toUpperCase()}, ${cardDetails?.landmark?.toUpperCase()}`}
      </div>

      <div className='w-[95%] md:w-[80%] text-[16px] md:text-[18px]'>
        {cardDetails?.description}
      </div>

      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[22px] font-semibold'>
        {`₹ ${cardDetails?.rent} / day`}
      </div>

      {/* Button */}
      <div className='w-[95%] h-[50px] flex items-center justify-start px-[110px]'>
       {cardDetails.userId == userData.id ? (
  <div className='flex gap-[20px]'>
    <button
      className='px-[30px] py-[10px] bg-red-500 text-white text-[18px] rounded-lg'
      onClick={() => setupdatepopup(true)}
    >
      Edit Listing
    </button>

    <button
      className='px-[30px] py-[10px] bg-black text-white text-[18px] rounded-lg'
      onClick={handleDelete}
    >
      Delete
    </button>
  </div>
) : (
  <button className='px-[30px] py-[10px] bg-red-500 text-white text-[18px] rounded-lg'>
    Reserve
  </button>
)}
      </div>

      {/* Popup */}
      {updatepopup && (
  <div className='w-full h-full fixed top-0 left-0 bg-[#000000b0] backdrop-blur-sm flex items-center justify-center z-[100]'>

    <form
      onSubmit={handleUpdateListing}
      className='max-w-[750px] w-[90%] max-h-[90vh] bg-[#181818] text-white relative rounded-2xl shadow-2xl p-[30px] flex flex-col gap-[15px] overflow-auto'
    >

      {/* Cross Button */}
      <RxCross2
        className='w-[35px] h-[35px] bg-red-500 hover:bg-red-600 text-white cursor-pointer absolute top-[15px] right-[15px] rounded-full p-[7px]'
        onClick={() => setupdatepopup(false)}
      />

      <h1 className='text-[28px] font-semibold mb-[10px]'>Update Listing</h1>

      {/* Title */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Title</label>
        <input
          type="text"
          className='bg-[#2a2a2a] p-[12px] rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Description</label>
        <textarea
          className='bg-[#2a2a2a] p-[12px] rounded-lg outline-none h-[90px] focus:ring-2 focus:ring-red-500'
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
      </div>

      {/* Image 1 */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Image 1</label>
        <input type="file" onChange={(e)=>setBackEndImage1(e.target.files[0])}/>
      </div>

      {/* Image 2 */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Image 2</label>
        <input type="file" onChange={(e)=>setBackEndImage2(e.target.files[0])}/>
      </div>

      {/* Image 3 */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Image 3</label>
        <input type="file" onChange={(e)=>setBackEndImage3(e.target.files[0])}/>
      </div>

      {/* Rent */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Rent (₹ per day)</label>
        <input
          type="number"
          className='bg-[#2a2a2a] p-[12px] rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          value={rent}
          onChange={(e)=>setRent(e.target.value)}
        />
      </div>

      {/* City */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>City</label>
        <input
          type="text"
          className='bg-[#2a2a2a] p-[12px] rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          value={city}
          onChange={(e)=>setCity(e.target.value)}
        />
      </div>

      {/* Landmark */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Landmark</label>
        <input
          type="text"
          className='bg-[#2a2a2a] p-[12px] rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          value={landmark}
          onChange={(e)=>setLandmark(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className='flex flex-col gap-[5px]'>
        <label className='text-gray-300'>Category</label>
        <input
          type="text"
          className='bg-[#2a2a2a] p-[12px] rounded-lg outline-none focus:ring-2 focus:ring-red-500'
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />
      </div>

      {/* Button */}
      <button className='mt-[10px] bg-red-500 hover:bg-red-600 transition-all duration-200 p-[14px] rounded-lg text-[18px] font-semibold'>
        Update Listing
      </button>

    </form>
  </div>
)}
    </div>
  )
}

export default ViewCard
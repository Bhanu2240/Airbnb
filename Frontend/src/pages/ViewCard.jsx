import React, { useContext, useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';
import { userDataContext } from '../Context/UserContext';
import { RxCross2 } from "react-icons/rx";

const ViewCard = () => {
  let navigate = useNavigate()
  let { cardDetails } = useContext(ListingDataContext)
  let { userData } = useContext(userDataContext)
  let [updatepopup, setupdatepopup] = useState(false)

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
        {cardDetails.host == userData._id ?
          <button
            className='px-[30px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg'
            onClick={() => setupdatepopup(true)}>
            Edit Listing
          </button>
          :
          <button className='px-[30px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg'>
            Reserve
          </button>
        }
      </div>

      {/* Popup */}
      {updatepopup && (
  <div className='w-full h-full fixed top-0 left-0 bg-[#000000b0] backdrop-blur-sm flex items-center justify-center z-[100]'>

    <form className='max-w-[800px] w-[90%] h-[520px] bg-[#1c1c1c] text-white relative rounded-xl shadow-2xl p-[30px] flex flex-col gap-[15px] overflow-auto'>

      {/* Cross */}
      <RxCross2
        className='w-[32px] h-[32px] bg-red-500 text-white cursor-pointer absolute top-[15px] right-[15px] rounded-full p-[6px]'
        onClick={() => setupdatepopup(false)}
      />

      <h1 className='text-[26px] font-semibold mb-[5px]'>Update Listing</h1>

      {/* Title */}
      <div className='flex flex-col gap-[5px]'>
        <label>Title</label>
        <input
          type="text"
          placeholder="2BHK House"
          className='bg-[#2a2a2a] p-[10px] rounded-lg outline-none'
        />
      </div>

      {/* Description */}
      <div className='flex flex-col gap-[5px]'>
        <label>Description</label>
        <textarea
          placeholder="Enter description"
          className='bg-[#2a2a2a] p-[10px] rounded-lg outline-none h-[80px]'
        />
      </div>

      {/* Image Inputs */}
      <div className='flex flex-col gap-[5px]'>
        <label>Image 1</label>
        <input type="file" className='bg-[#2a2a2a] p-[8px] rounded-lg' />
      </div>

      <div className='flex flex-col gap-[5px]'>
        <label>Image 2</label>
        <input type="file" className='bg-[#2a2a2a] p-[8px] rounded-lg' />
      </div>

      <div className='flex flex-col gap-[5px]'>
        <label>Image 3</label>
        <input type="file" className='bg-[#2a2a2a] p-[8px] rounded-lg' />
      </div>

      {/* Rent */}
      <div className='flex flex-col gap-[5px]'>
        <label>Rent</label>
        <input
          type="number"
          placeholder="₹ / day"
          className='bg-[#2a2a2a] p-[10px] rounded-lg outline-none'
        />
      </div>

      {/* City */}
      <div className='flex flex-col gap-[5px]'>
        <label>City</label>
        <input
          type="text"
          placeholder="City, Country"
          className='bg-[#2a2a2a] p-[10px] rounded-lg outline-none'
        />
      </div>

      {/* Landmark */}
      <div className='flex flex-col gap-[5px]'>
        <label>Landmark</label>
        <input
          type="text"
          placeholder="Near metro / park / etc"
          className='bg-[#2a2a2a] p-[10px] rounded-lg outline-none'
        />
      </div>

      {/* Button */}
      <button className='mt-[10px] bg-red-500 hover:bg-red-600 transition-all duration-200 p-[12px] rounded-lg text-[18px] font-semibold'>
        Update Listing
      </button>

    </form>
  </div>
)}

    </div>
  )
}

export default ViewCard
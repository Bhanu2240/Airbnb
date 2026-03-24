import React, { useContext } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../Context/ListingContext';

const ListingPage3 = () => {
  let navigate = useNavigate();

  let {
    title,
    description,
    frontEndImage1,
    frontEndImage2,
    frontEndImage3,
    rent,
    city,
    landmark,
    category,
    handleAddListing,
    adding,setAdding
  } = useContext(ListingDataContext);

  const handleSubmit = async () => {
    await handleAddListing();
    navigate("/"); // go to home page after adding
  };

  return (
    <div className='w-[100%] h-[100vh] bg-[white] flex items-center justify-center gap-[10px] flex-col overflow-auto relative'>
      
      {/* Back Button */}
      <div
        className='w-[45px] h-[45px] bg-red-500 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center'
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeftLong className='w-[20px] h-[20px] text-[white]' />
      </div>

      {/* Location */}
      <div className='w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]'>
        <h1 className='text-[20px] text-[#272727] md:text-[30px]'>
          {`In ${landmark?.toUpperCase()}, ${city?.toUpperCase()}`}
        </h1>
      </div>

      {/* Images Preview */}
      <div className='w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row'>
        
        <div className='w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border bg-gray-200'>
          {frontEndImage1 && (
            <img src={frontEndImage1} alt="" className='w-full h-full object-cover' />
          )}
        </div>

        <div className='w-[100%] h-[30%] flex md:w-[30%] md:h-[100%] md:flex-col'>
          <div className='w-[100%] h-[100%] overflow-hidden border bg-gray-200'>
            {frontEndImage2 && (
              <img src={frontEndImage2} alt="" className='w-full h-full object-cover' />
            )}
          </div>
          <div className='w-[100%] h-[100%] overflow-hidden border bg-gray-200'>
            {frontEndImage3 && (
              <img src={frontEndImage3} alt="" className='w-full h-full object-cover' />
            )}
          </div>
        </div>

      </div>

      {/* Details */}
      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[22px] font-semibold'>
        {`${title?.toUpperCase()}, ${category?.toUpperCase()}, ${landmark?.toUpperCase()}`}
      </div>

      <div className='w-[95%] md:w-[80%] text-[16px] md:text-[18px]'>
        {description}
      </div>

      <div className='w-[95%] md:w-[80%] text-[18px] md:text-[22px] font-semibold'>
        {`₹ ${rent} / day`}
      </div>

      {/* Add Listing Button */}
      <div className='w-[95%] h-[50px] flex items-center justify-start md:w-[80%]'>
        <button
          className='px-[50px] py-[10px] bg-red-500 text-white text-[18px] md:px-[100px] rounded-lg'
          onClick={handleSubmit} disabled={adding} >
         {adding?"adding...":"Add Listing"}
        </button>
      </div>

    </div>
  );
};

export default ListingPage3;
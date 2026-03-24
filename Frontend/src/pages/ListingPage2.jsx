import React, { useContext } from 'react'
import { FaArrowLeftLong, FaTreeCity } from "react-icons/fa6";
import { GiFamilyHouse, GiWoodCabin } from 'react-icons/gi';
import { IoBedOutline } from 'react-icons/io5';
import { MdBedroomParent } from 'react-icons/md';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePool } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { ListingDataContext } from '../Context/ListingContext';

const ListingPage2 = () => {
    let navigate=useNavigate()
    let {category,setCategory} =useContext(ListingDataContext)
  return (
    <div className='w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto relative'>
         <div className='w-[45px] h-[45px] bg-red-500 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center ' onClick={()=>navigate("/listingpage1")}><FaArrowLeftLong  className='w-[20px] h-[20px] text-[white]'/></div>
                <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>
                  set your Category
        
                </div>
                <div className='max-w-[900px] w-[100%] h-[550px] overflow-auto bg-white flex items-center justify-start flex-col gap-[40px] mt-[30px] '>
                <h1 className='text-[18px] text-[black] md:text-[30px] px-[10px]'>Which of these best describes your place?</h1>
                <div className='max-w-[900px] w-[100%] h-[100%]  flex flex-wrap items-center justify-center  gap-[15px] md:w-[70%] '>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="villa"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("villa")}>
                    <GiFamilyHouse className='w-[30px] h-[30px] text-[black]'/><h3>Villa</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="farmhouse"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("farmhouse")}>
                    <MdBedroomParent className='w-[30px] h-[30px] text-[black]'/><h3>Farm House</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="poolhouse"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("poolhouse")}>
                    <MdOutlinePool className='w-[30px] h-[30px] text-[black]'/><h3>Pool House</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="rooms"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("rooms")}>
                    <GiWoodCabin className='w-[30px] h-[30px] text-[black]'/><h3>Rooms</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="flat"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("flat")}>
                    <SiHomeassistantcommunitystore className='w-[30px] h-[30px] text-[black]'/><h3>Flat</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="pg"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("pg")}>
                    <IoBedOutline className='w-[30px] h-[30px] text-[black]'/><h3>PG</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="cabins"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("cabins")}>
                    <FaTreeCity className='w-[30px] h-[30px] text-[black]'/><h3>Cabins</h3>

                    </div>
                    <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg  ${category=="shops"?"border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("shops")}>
                    <BiBuildingHouse className='w-[30px] h-[30px] text-[black]'/><h3>Shops</h3>

                    </div>
                    </div>
                    

                </div>
                 <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg absolute right-[5%] bottom-[5%]' onClick={()=>navigate("/listingpage3")} disabled={!category}>
            Next
          </button>

      
    </div>
  )
}

export default ListingPage2

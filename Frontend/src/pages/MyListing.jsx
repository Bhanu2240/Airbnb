import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { userDataContext } from '../Context/UserContext';
import Card from '../Component/Card';
import { ListingDataContext } from '../Context/ListingContext';


export default function MyListing() {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)
    let { listingData } = useContext(ListingDataContext);

    if (!userData) {
        return <h1 className='mt-[100px] text-[25px]'>Loading...</h1>
    }
   

    return (
        <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative'>
            <div className='w-[45px] h-[45px] bg-red-500 cursor-pointer absolute top-[20px] left-[20px] rounded-full flex items-center justify-center' onClick={() => navigate("/")}>
                <FaArrowLeftLong className='w-[20px] h-[20px] text-[white]' />
            </div>

            <div className='w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:w-[600px]'>
                MY LISTING
            </div>

            <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
               {listingData
  ?.filter((list) => list.userId === userData.id)
  .map((list) => (
                    <Card
                        key={list.id}   // ✅ important
                        title={list.title}
                        landmark={list.landmark}
                        city={list.city}
                        image1={list.image1}
                        image2={list.image2}
                        image3={list.image3}
                        rent={list.rent}
                        id={list.id}
                    />
                ))}
            </div>
        </div>
    )
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const serverUrl = "http://localhost:8000"; // change if needed

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/booking/trips`, { withCredentials: true });
        if (res.data.success) {
          setTrips(res.data.trips);
        }
      } catch (err) {
        toast.error("Failed to load trips");
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className='w-full min-h-screen bg-white flex flex-col items-center py-[20px] relative overflow-auto'>
      <div
        className='w-[45px] h-[45px] bg-red-500 cursor-pointer absolute top-[20px] left-[20px] md:left-[50px] rounded-full flex items-center justify-center'
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className='w-[20px] h-[20px] text-white' />
      </div>

      <h1 className='text-[30px] md:text-[40px] font-bold text-[#272727] mb-[30px] mt-[60px] md:mt-0'>
        My Trips
      </h1>

      <div className='w-[95%] md:w-[80%] flex flex-col gap-[20px]'>
        {trips.length === 0 ? (
          <p className='text-[20px] text-gray-500'>No trips booked yet.</p>
        ) : (
          trips.map((trip) => (
            <div key={trip.id} className='w-full border rounded-xl p-[20px] shadow-sm flex flex-col md:flex-row gap-[20px] items-center'>
              <div className='w-full md:w-[30%] h-[200px] bg-gray-200 rounded-lg overflow-hidden'>
                {trip.listing?.image1 && (
                  <img src={trip.listing.image1} alt="Listing" className='w-full h-full object-cover' />
                )}
              </div>
              <div className='w-full md:w-[70%] flex flex-col gap-[10px]'>
                <h2 className='text-[24px] font-semibold'>{trip.listing?.title}</h2>
                <p className='text-[18px] text-gray-600'>{trip.listing?.city}, {trip.listing?.landmark}</p>
                <div className='mt-[10px] bg-gray-100 p-[15px] rounded-lg'>
                  <p className='text-[16px] font-medium'>
                    <span className='text-red-500'>Dates:</span> {format(new Date(trip.startDate), 'MMM dd, yyyy')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}
                  </p>
                  <p className='text-[16px] font-bold mt-[5px]'>
                    Total Price: ₹ {trip.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTrips;

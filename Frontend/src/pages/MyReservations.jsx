import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const serverUrl = "http://localhost:8000"; // change if needed

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/booking/reservations`, { withCredentials: true });
        if (res.data.success) {
          setReservations(res.data.reservations);
        }
      } catch (err) {
        toast.error("Failed to load reservations");
      }
    };
    fetchReservations();
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
        My Reservations
      </h1>

      <div className='w-[95%] md:w-[80%] flex flex-col gap-[20px]'>
        {reservations.length === 0 ? (
          <p className='text-[20px] text-gray-500'>No reservations received yet.</p>
        ) : (
          reservations.map((resv) => (
            <div key={resv.id} className='w-full border border-red-200 rounded-xl p-[20px] shadow-sm flex flex-col md:flex-row gap-[20px] items-start bg-red-50'>
              <div className='w-full md:w-[70%] flex flex-col gap-[10px]'>
                <h2 className='text-[24px] font-semibold'>{resv.listing?.title}</h2>
                <p className='text-[18px] text-gray-600'>Property in {resv.listing?.city}</p>
                <div className='mt-[10px] bg-white border p-[15px] rounded-lg'>
                  <p className='text-[16px] font-medium'>
                    <span className='text-red-500'>Guest:</span> {resv.user?.name} ({resv.user?.email})
                  </p>
                  <p className='text-[16px] font-medium mt-[5px]'>
                    <span className='text-red-500'>Dates:</span> {format(new Date(resv.startDate), 'MMM dd, yyyy')} - {format(new Date(resv.endDate), 'MMM dd, yyyy')}
                  </p>
                  <p className='text-[18px] font-bold mt-[10px]'>
                    Earnings: ₹ {resv.totalPrice}
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

export default MyReservations;

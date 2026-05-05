import React, { useContext } from 'react'
import { userDataContext } from '../Context/UserContext'
import { ListingDataContext } from '../Context/ListingContext'
import { useNavigate } from 'react-router-dom'

function Card({ title, landmark, description, image1, image2, image3, rent, city, id }) {
  let navigate = useNavigate()
  let { userData } = useContext(userDataContext)
  let { handleViewCard } = useContext(ListingDataContext)
  const handleClick = () => {
    if (userData) {
      handleViewCard(id)
    }
    else {
      navigate("/login")

    }
  }
  return (
    <div className='w-[330px] max-w-[85%] h-[500px] flex flex-col rounded-xl cursor-pointer bg-white overflow-hidden shadow-md hover:shadow-lg transition' onClick={handleClick}>

      {/* Image Slider */}
      <div className="w-full h-[60%] overflow-hidden">
        <div className="flex w-full h-full overflow-x-auto scroll-smooth">
          <img src={image1} className="w-full h-full object-cover flex-shrink-0" />
          <img src={image2} className="w-full h-full object-cover flex-shrink-0" />
          <img src={image3} className="w-full h-full object-cover flex-shrink-0" />
        </div>
      </div>

      {/* Details */}
      <div className='p-3 flex flex-col'>
        <h1 className='font-semibold text-lg'>{title}</h1>

        <p className='text-gray-700 text-sm'>{landmark}</p>

        <p className='text-gray-500 text-sm'>{city}</p>

        <p className='text-gray-500 text-sm mt-1 line-clamp-2'>
          {description}
        </p>

        <p className='font-bold mt-2 text-lg'>₹ {rent} / Day</p>
      </div>

    </div>
  )
}

export default Card
import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthDataContext } from "../Context/AuthContext";
import { userDataContext } from '../Context/UserContext';
import axios from 'axios';


export default function Login() {

  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  let {serverUrl} = useContext(AuthDataContext)
  let {userData,setUserData} = useContext(userDataContext)
  
  let [email,setEmail] =useState("")
  let [password,setPassword] =useState("")
  let {loading,setLoading}=useContext(AuthDataContext)
   const handleLogin=async(e)=>{
    setLoading(true)
        try{
            e.preventDefault()
            let result= await axios.post(serverUrl + "/api/auth/login",{
                email,password

            },{
                withCredentials:true
            })
            setLoading(false)
            setUserData(result.data)
            navigate("/")
            console.log(result)
        }catch(error){
          setLoading(false)
            console.error("Error occurred while logging in:", error)
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("Network Error: Could not reach the server.");
            }
        }
    }

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center relative'>
          <div className='w-[45px] h-[45px] bg-red-500 cursor-pointer absolute top-[20px] left-[20px] rounded-full flex items-center justify-center ' onClick={()=>navigate("/")}><FaArrowLeftLong  className='w-[20px] h-[20px] text-[white]'/></div>
      <form className='max-w-[900px] w-[90%] h-[600px] flex items-center justify-center flex-col md:items-start gap-[10px]' onSubmit={handleLogin}>

        <h1 className='text-[30px] text-[black]'>Welcome to Airbnb</h1>

        <div className='w-[90%] flex flex-col gap-[10px]'>
          <label htmlFor='email' className='text-[20px]'>Email</label>
          <input type="text" id='email'
            className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>

        <div className='w-[90%] flex flex-col gap-[10px] relative'>
          <label htmlFor='password' className='text-[20px]'>Password</label>

          <input
            type={show ? "text" : "password"}
            id='password'
            className='w-[90%] h-[40px] border-2 border-[#555656] rounded-lg text-[18px] px-[20px]' required onChange={(e)=>setPassword(e.target.value)} value={password}
          />

          {!show && (
            <IoMdEye
              className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(true)}
            />
          )}

          {show && (
            <IoMdEyeOff
              className='w-[22px] h-[22px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(false)}
            />
          )}
        </div>

        <div>
          <button className='px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg' disabled={loading}>
         {loading?"Loading...":"Login"}
          </button>
        </div>
        <p>Create new account? <a href="/signup" className='text-[red] underline'>Signup</a></p>
      </form>
    </div>
  )
}
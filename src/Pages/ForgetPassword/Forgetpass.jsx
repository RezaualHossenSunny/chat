import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const Forgetpass = () => {
  const auth = getAuth();
  const [email, setEmail] =useState('');
  const user = auth.currentUser;

 

  const handleReset = ()=>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
   console.log('okkkk');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }

  return (
    <div className='h-screen w-full bg-primary flex items-center justify-center'>
        <div className='bg-white p-20 border border-[5px] rounded'>
            <h1 className='font-open text-hedding font-bold text-3xl'>Forgot Password</h1>

            <div className='mt-16 relative'>
            <input onChange={(e)=> setEmail(e.target.value)}  className='py-6  w-96   border-b border-[#BFBFBF] focus:outline-0 ' type="email" placeholder='enter your email email' />
            <p className='absolute top-[-13px]   font-open font-semibold text-hedding bg-white tracking-wide'>Email Address</p>
        
          </div>
          <div className='flex gap-x-5 mt-10'>
          <div onClick={handleReset}  className='font-open font-semiBold font-xl bg-[#FF5233] text-white p-5 text-center rounded-[5px] cursor-pointer'>Reset </div>

          <div className='font-open font-semiBold font-xl bg-[#3498DB] text-white p-5 text-center rounded-[5px] cursor-pointer'> <Link to='/login'>Back To Login  </Link> </div>

          

         </div>
        </div>

    </div>
  )
}

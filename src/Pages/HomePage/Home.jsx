import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import Saidebar from '../../component/Saidebar/Saidebar'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Serch from '../../component/Saidebar/Serch/Serch';
import Grouplist from '../../component/Saidebar/Grouplist/Grouplist';
import Friendrequst from '../../component/Saidebar/FriendRequest/Friendrequst';
import { Friends } from '../../component/Saidebar/Fridends/Friends';
import Group from '../../component/Saidebar/Group/Group';
import UserList from '../../component/Saidebar/UserList/UserList';
import Blocked from '../../component/Saidebar/Blocked/Blocked';
import { userLoginInfo } from '../../Slices/userSlice';

const Home = () => {
  const auth = getAuth();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [varify,Setvarify] =useState(false)
  const data =useSelector(state=> state.userLoginInfo.userInfo);
  console.log(data);

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  })
  onAuthStateChanged(auth, (user)=>{
    console.log('uss',user);
    if(user.emailVerified){
      Setvarify(true)
      dispatch(userLoginInfo(user));
      localStorage.setItem('userLoginInfo',JSON.stringify((user)))
    }
  })
  return (
  <div>
    {
      varify ?
      <div className=' md:flex gap-x-[100px] mt-2 md:mt-[32px] '>
      <div className='w-full md:w-[187px] md:ml-[32px] '>
     <Saidebar active='home'/>
      </div>
      <div className='w-[427px]'>
        <Serch/>
        <Grouplist/>
        <Friendrequst/>
      </div>
      <div className='w-[427px]'>
      <Friends/>
      <Group/>
      
      </div>
      <div className='w-[427px]'>
        <UserList/>
        <Blocked/>
      </div>
    </div>
    :
    <div className='bg-primary  h-screen w-full  flex justify-center items-center'>
   <div>
   <h2 className=' text-5xl font-nunito text-white font-bold'>plesase verify your email</h2>

<div className='bg-orange-600 p-[20px] inline-block mt-[20px] text-inter font-bold text-white rounded'><Link to='/login'>Back To Login</Link></div>
   </div>
    </div>
  
    }
  </div>
  )
}

export default Home
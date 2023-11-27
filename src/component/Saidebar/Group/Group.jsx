import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import pic from '../../../assets/p4.png'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
const Group = () => {
    const data=useSelector(state=>state.userLoginInfo.userInfo);
    const db = getDatabase();
    const [grouplist,setGrouplist]=useState([]);
    useEffect(()=>{

        const groupRef = ref(db, 'group/');
    onValue( groupRef, (snapshot) => {
  
    let arr= []
    snapshot.forEach((item)=>{

        if(data.uid  == item.val().adminid){
            arr.push({...item.val(), key:item.key})
        }
     
        
        
    })
    setGrouplist(arr)
    });
    },[])

  return (
    <div className='relative shadow-shadow py-5 px-[20px] w-full rounded-lg mt-[50px] '>
       


    <div className='flex justify-between items-center'>
    <h4 className='font-popins text-[20px] font-bold'>My Groups</h4>


   <PiDotsThreeVerticalBold className='text-3xl text-primary absolute w-full px-[10px] left-[190px]'/>


    </div>

<div className='h-[305px] overflow-y-scroll mt-[10px]'>


{
    grouplist.map((item)=>(
        <div className='flex items-center mt-[25px] border-b-2 border-gray-400 pb-[13px]'>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           <h1 className='font-popins text-lg font-semibold'>{item.groupName}</h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>{item.groutagName}</p>
       </div>
       <div className='ml-[41px]'>
           <p className='text-gray-500 font-popins'>Today, 8:56pm</p>
       </div>
    </div>
    ))
}

   




</div>


   </div>
  )
}

export default Group
import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import pic from '../../../assets/p2.png'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
const Friendrequst = () => {
    const db = getDatabase();
    const data=useSelector(state=>state.userLoginInfo.userInfo);
    const [friendrequestlist,setfriendrequstlist]=useState([])

    useEffect(()=>{

        const friendrequestRef = ref(db, 'friendrequest/');
    onValue( friendrequestRef, (snapshot) => {
  
    let arr= []
    snapshot.forEach((item)=>{

        console.log(item.val(),'fffff');
    //   arr.push(item.val());
    if(item.val(). reciverid==data.uid){
        arr.push({...item.val(), id:item.key})
    }
    console.log(item.key);
    console.log(data.uid);
        
    })
    setfriendrequstlist(arr)
    });
    },[])

    const handleAcept =(item)=>{
        console.log('faaa', item);
        set(push(ref(db, 'friend/')), {
           ...item
          }).then(()=>{
            remove((ref(db, 'friendrequest/'+ item.id)))
          })
    }
  return (
    <div className='relative shadow-shadow py-5 px-[20px] w-full rounded-lg mt-[43px]'>
       


    <div className='flex justify-between items-center'>
    <h4 className='font-popins text-[20px] font-bold'>Friend  Request</h4>


   <PiDotsThreeVerticalBold className='text-3xl text-primary absolute w-full px-[10px] left-[190px]'/>


    </div>

<div className='h-[322px] overflow-y-scroll'>
{
    friendrequestlist.map((item)=>(
        <div className='flex items-center mt-[17px] border-b-2 border-gray-400 pb-[13px]'>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           <h1 className='font-popins text-lg font-semibold'>{item.sendername}</h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>Dinner?</p>
       </div>
       <div className='ml-[71px]'>
           <p onClick={()=>handleAcept(item)} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold'> Accept</p>
       </div>
    </div>
    ))
}


   




</div>


   </div>
  )
}

export default Friendrequst
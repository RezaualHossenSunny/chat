import React, { useEffect, useState } from 'react'
import pic from '../../../assets/p6.png'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
const Blocked = () => {
    const db = getDatabase();
    const data=useSelector(state=>state.userLoginInfo.userInfo);
    const [blocklist,setBlocklist]=useState([])

    useEffect(()=>{

        const blockRef = ref(db, 'block/');
        onValue( blockRef, (snapshot) => {
  
    let arr= []
    snapshot.forEach((item)=>{

        console.log(item.val(),'block');
        if(item.val().blockid==data.uid){
            arr.push({
                id:item.key,
                block:item.val().block,
                blockid:item.val().blockid

            })
        }else{
            arr.push({
                id:item.key,
                blockby:item.val().blockby,
                blockid:item.val().blockid

            })
        }
        
    })
    setBlocklist(arr)
    });
    },[])

    console.log(blocklist);
    const handleUnblock=(item)=>{
    console.log(item);
    set(push(ref(db, 'friend/')), {
        sendername:item.block,
        senderid:item.id,
        recivername:data.displayName,
        reciverid:data.uid
       }).then(()=>{
        remove(ref(db, 'block/'+item.id))
       })
    }

  return (
    <div className='relative shadow-shadow py-5 px-[20px] w-full rounded-lg mt-[43px]'>
       


    <div className='flex justify-between items-center'>
    <h4 className='font-popins text-[20px] font-bold'>Block List</h4>


   <PiDotsThreeVerticalBold className='text-3xl text-primary absolute w-full px-[10px] left-[190px]'/>


    </div>

<div className='h-[322px] overflow-y-scroll'>
{
    blocklist.map((item)=>(
        <div className='flex items-center mt-[17px] border-b-2 border-gray-400 pb-[13px]'>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           
           <h1 className='font-popins text-lg font-semibold'>{item.block} </h1>
           <h1 className='font-popins text-lg font-semibold'>{item.blockby} </h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>Today, 8:56pm</p>
       </div>
       {
        !item.blockby &&
        <div className='ml-[71px]'>
           <p onClick={()=> handleUnblock(item)} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold'> unblock</p>
       </div>
       }
     
    </div>
    ))
}
</div>


   </div>
  )
}

export default Blocked
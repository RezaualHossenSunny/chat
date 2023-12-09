import React, { useEffect, useState } from 'react'
import pic from '../../../assets/p3.png'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { active } from '../../../Slices/activeChatSlice'
export const Friends = () => {
    const data=useSelector(state=>state.userLoginInfo.userInfo);
    const db = getDatabase();
    const [friend,setFriend]=useState([])
    const dispach=useDispatch()
    useEffect(()=>{

     const friendRef = ref(db, 'friend/');
    onValue( friendRef, (snapshot) => {
  
    let arr= []
    snapshot.forEach((item)=>{
        // console.log(item.val(),'ssssssssssss');
        if(data.uid ==item.val(). reciverid ||data.uid ==item.val().senderid ){
            arr.push({...item.val(),key:item.key})
        }
       
       
        
    })
    setFriend(arr)
    });
    },[])
const handleBlock=(item)=>{
console.log(item ,'jjvjv');

if(data.uid==item.senderid){
set(push(ref(db, 'block/')), {
   blockid:item.reciverid,
   block:item.recivername,
   blockby:item.sendername,
   blockid:item.senderid
   }).then(()=>{
    remove(ref(db, 'friend/'+ item.key))
   })
}else{
    set(push(ref(db, 'block/')), {
        blockid:item.senderid,
        block:item.sendername,
        blockby:item.recivername,
        blockid:item.reciverid
        }).then(()=>{
            remove(ref(db, 'friend/'+ item.key))
           })
}

}
const handleChat=(item)=>{
    console.log(item);
    if(item.reciverid == data.uid){
        dispach(active({
            status:'single',
            id:item.senderid,
            name:item.sendername
        }))
    }else{
        dispach(active({
            status:'single',
            id:item.reciverid,
            name:item.recivername
        }))  
    }
}
  return (
    <div className='relative shadow-shadow py-5 px-[20px] w-full rounded-lg '>
       


    <div className='flex justify-between items-center'>
    <h4 className='font-popins text-[20px] font-bold'>Friends</h4>


   <PiDotsThreeVerticalBold className='text-3xl text-primary absolute w-full px-[10px] left-[190px]'/>


    </div>

<div className='h-[385px] overflow-y-scroll mt-[45px]'>
{
    friend.map((item)=>(
        <div onClick={()=>handleChat(item)} className='flex items-center mt-[17px] border-b-2 border-gray-400 pb-[13px] '>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           <h1 className='font-popins text-lg font-semibold'>{
            data.uid== item.senderid ?item.recivername :item.sendername
           }</h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>I will call him today.</p>
       </div>
       <div className='ml-[41px]'>
       <p onClick={()=> handleBlock(item)} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'> Block</p>
       </div>
    </div>
    ))
}
   

    





</div>


   </div>
  )
}

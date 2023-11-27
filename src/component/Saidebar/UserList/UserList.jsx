import React, { useEffect, useState } from 'react'
import pic from '../../../assets/p5.png'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
import {BsSearch} from 'react-icons/bs'

const UserList = () => {
    const db = getDatabase();
    const [useData,SetuseData]=useState([]);
    const [friendRequestData,setFriendRequestdat]= useState([]);
    const data=useSelector(state=>state.userLoginInfo.userInfo);
    const [friendlist,setfriendlist]=useState([]);
    const[userSerch,setuserSerch]=useState([]);
     console.log(data.displayName);
    useEffect(()=>{

        const userRef = ref(db, 'users/');
    onValue( userRef, (snapshot) => {
  
    let arr= []
    snapshot.forEach((item)=>{
        if(data.uid !=item.key){
            arr.push({...item.val(),userid:item.key});
        }
        
    })
    SetuseData(arr)
    });
    },[])

    const handleFriendRequst =(item)=>{
        set(push(ref(db, 'friendrequest/')),{
           sendername:data.displayName,
           senderid:data.uid,   
             recivername:item.username,
            reciverid:item.userid
            
        });

      

    }
    useEffect(()=>{
        const friendrequest =ref(db, 'friendrequest/');
        onValue(friendrequest,(snapshot)=>{
            let arr=[]
            snapshot.forEach((item)=>{
                arr.push(item.val().senderid+item.val().reciverid);
                // console.log(item.val());
            })
            setFriendRequestdat(arr);

        });
    },[])

    useEffect(()=>{
        const friendlist =ref(db, 'friend/');
        onValue(friendlist,(snapshot)=>{
            let arr=[]
            snapshot.forEach((item)=>{
                arr.push(item.val().senderid+item.val().reciverid);
                // console.log(item.val());
            })
            setfriendlist(arr);

        });
    },[])
 const handleSerch=(e)=>{
console.log(e.target.value);
let arr=[]
if(e.target.value.length ==0){
    setuserSerch([])
}else{
    useData.filter((item)=>{
        // console.log(item.username.toLowerCase().includes(e.target.value.toLowerCase()));
        if(item.username.toLowerCase().includes(e.target.value.toLowerCase())){
            arr.push(item)
            setuserSerch(arr)
        }
    })
}


 }
 console.log(userSerch,'ki khobor');
  return (
    <div className='relative shadow-shadow py-5 px-[20px] w-full rounded-lg '>
       


    <div className='flex justify-between items-center'>
    <h4 className='font-popins text-[20px] font-bold'>User List</h4>


   <PiDotsThreeVerticalBold className='text-3xl text-primary absolute w-full px-[10px] left-[190px]'/>


    </div>

<div className='h-[427px] overflow-y-scroll'>
{/* //Serch */}
<div className='relative mt-2'>
        <input onChange={handleSerch} type="text" className='shadow-shadow py-5 px-[40px] w-full rounded-lg' />
<div className='flex justify-between absolute  top-[27%] left-0  w-full px-[10px]'>
<BsSearch className='text-3xl'/>
  
</div>
    </div>
    {
        userSerch.length >0 ?
        userSerch.map((item)=>(
        <div className='flex items-center mt-[20px] border-b-2 border-gray-400 pb-[13px]'>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           <h1 className='font-popins text-lg font-semibold'>{item.username}</h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>22.10</p>
       </div>
       <div className='ml-[71px]'>
      {
        friendlist.includes(data.uid+item.userid) || friendlist.includes(item.userid+data.uid) 
        ?
        <p  className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Friend</p>
        :
        friendRequestData.includes(data.uid+item.userid) || friendRequestData.includes(item.userid+data.uid)
              ?  <p  className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Peinding</p>
                 :
                 <p onClick={()=>handleFriendRequst(item)} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'> send</p>
      }
          
            
         
       </div>
    </div>
    ))
        :
        useData.map((item)=>(
        <div className='flex items-center mt-[20px] border-b-2 border-gray-400 pb-[13px]'>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           <h1 className='font-popins text-lg font-semibold'>{item.username}</h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>22.10</p>
       </div>
       <div className='ml-[71px]'>
      {
        friendlist.includes(data.uid+item.userid) || friendlist.includes(item.userid+data.uid) 
        ?
        <p  className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Friend</p>
        :
        friendRequestData.includes(data.uid+item.userid) || friendRequestData.includes(item.userid+data.uid)
              ?  <p  className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Peinding</p>
                 :
                 <p onClick={()=>handleFriendRequst(item)} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'> send</p>
      }
          
            
         
       </div>
    </div>
    ))
    }
{/* {
    useData.map((item)=>(
        <div className='flex items-center mt-[20px] border-b-2 border-gray-400 pb-[13px]'>
       <div>
          <img src={pic}></img>
       </div>
       <div className='ml-[17px]'>
           <h1 className='font-popins text-lg font-semibold'>{item.username}</h1>
           <p className='font-popins text-sm font-semibold text-gray-500'>22.10</p>
       </div>
       <div className='ml-[71px]'>
      {
        friendlist.includes(data.uid+item.userid) || friendlist.includes(item.userid+data.uid) 
        ?
        <p  className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Friend</p>
        :
        friendRequestData.includes(data.uid+item.userid) || friendRequestData.includes(item.userid+data.uid)
              ?  <p  className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Peinding</p>
                 :
                 <p onClick={()=>handleFriendRequst(item)} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'> send</p>
      }
          
            
         
       </div>
    </div>
    ))
} */}



  




</div>


   </div>
  )
}

export default UserList
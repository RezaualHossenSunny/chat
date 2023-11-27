import React, { useEffect, useState } from 'react'
import { PiDotsThreeVerticalBold } from 'react-icons/pi'
import pic from '../../../assets/p1.png';
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from 'react-redux';
const Grouplist = () => {
    const db = getDatabase();
    const data=useSelector(state=>state.userLoginInfo.userInfo);
    const [show,setShow]= useState(false)
    const[groupName,SetgroupName]=useState('');
    const[groutagName,SetgrouptagName]=useState('');
    const [allGroup,setAllGrouplist]=useState([]);
    //group list ar kaz
    useEffect(()=>{

     const groupRef = ref(db, 'group/');
    onValue( groupRef, (snapshot) => {
  
    let arr= []
    snapshot.forEach((item)=>{

        if(data.uid  != item.val().adminid){
            arr.push({...item.val(), key:item.key})
        }
     
        
        
    })
    setAllGrouplist(arr)
    });
    },[])

 //group create
    const handleGroup = ()=>{
      setShow(!show)
    }

    const handleCreateGroup=()=>{
        
        set(push(ref(db, 'group/')),{
          groupName:groupName,
          groutagName:groutagName,
          adminName:data.displayName,
          adminid:data.uid
             
         });
    }
  return (
      <div className='relative shadow-shadow py-5 px-[20px] w-full rounded-lg mt-[50px]'>
       


     <div className='flex justify-between items-center'>
     <h4 className='font-popins text-[20px] font-bold'>Groups List</h4>
    {
        show ?
        <div className='ml-[20px]'>
     <p onClick={handleGroup} className='bg-cyan-500 px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'> GO Back</p>
        </div>
        :
        <div className='ml-[20px]'>
     <p onClick={handleGroup} className='bg-primary px-[27px] py-[10px] rounded text-lg font-popins text-white font-bold cursor-pointer'>Create Group</p>
        </div>
    }




     </div>

 <div className='h-[322px] overflow-y-scroll'>


{
    show ?
   <div className='mt-2'>
   <input onChange={(e)=> SetgroupName(e.target.value)} className='py-6  w-[350px]   border border-[#BFBFBF] focus:outline-0 rounded-lg' type='text' placeholder='Group name' />

   <input onChange={(e)=> SetgrouptagName(e.target.value)} className='py-6  w-[350px] mt-2   border border-[#BFBFBF] focus:outline-0 rounded-lg' type='text' placeholder='Group TagLine' />

   <p onClick={handleCreateGroup} className='bg-orange-500  w-[350px] px-[10px] py-[10px] mt-4 rounded-lg text-lg font-popins text-white text-center font-bold cursor-pointer'>Create Group</p>
   </div>
    :
    <>
        {
            allGroup.map((item)=>(
                <div className='flex items-center mt-[17px] border-b-2 border-gray-400 pb-[13px]'>
        <div>
            <img src={pic}></img>
        </div>
        <div className='ml-[17px]'>
            <h1 className='font-popins text-lg font-semibold'>{item.groupName}</h1>
            <p className='font-popins text-sm font-semibold text-gray-500'>{item.groutagName}</p>
        </div>
       
     </div>
            ))
        }
    </>
}
 

  

  

    

     


 </div>


    </div>
  )
}

export default Grouplist
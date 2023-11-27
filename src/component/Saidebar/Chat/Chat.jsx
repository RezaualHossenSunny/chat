import { HiDotsVertical } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import { BsFillEmojiLaughingFill, BsFillCameraFill } from 'react-icons/bs';
import { IoTriangle } from "react-icons/io5";
// import profile from '../../assets/profile.png'
import profile from '../../../assets/profile.png'
import img1 from '../../../assets/pixel.jpg'
import ModalImage from "react-modal-image";
import { BsFillSendPlusFill } from "react-icons/bs";
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
const Chat = () => {
   const active= useSelector(state => state.activeChatSlice);
   console.log(active);
   const db=getDatabase()
   const [msg,setMsg]=useState('')
   const handleSendMsg=()=>{
      console.log('okkk send');
      if(active.active.status =='single'){
       set(ref(db, 'activeChat/'),{
         msg:msg
       })
      }else{
         console.log('group');
      }
   }
   return (
      <>
         <div className="w-full  rounded-custom shadow-homeCardShadow pl-12 pr-7 ">
            {/* receiver identity */}
            <div className="row-span-2 flex items-center justify-between border-b-[1px] border-solid border-[#00000040]">
               <div className="flex items-center">
                  <div className=" inline-block relative mr-3.5 after:content-[''] after:h-[17px] after:w-[17px] after:bg-[#00FF75] after:absolute after:bottom-0.5 after:right-0.5 after:rounded-full after:border-solid after:border-white after:border-2 after:drop-shadow-navIconDropShadow">
                     <img  className='w-[75px] h-[75px] rounded-full object-cover drop-shadow-navIconDropShadow' src={profile} alt="Ellipse2.png" />
                  </div>
                  <div className="ml-8">
                     <h2 className="font-poppins text-2xl font-semibold">{active.active.name}</h2>
                     <p className="font-poppins text-sm text-[#000000D9]">Online</p>
                  </div>
               </div>
               <div className='text-3xl cursor-pointer text-themeColor'>
                  <HiDotsVertical />
               </div>
            </div>
            {/* recive messages */}
            <div className="row-span-9 pt-1.5 pb-2.5">
               <div className="h-[800px] overflow-y-scroll">
                  <div className="mt-5">
                   <div className='relative'>
                   <h4 className="bg-[#F1F1F1] py-[20px] px-[52px] inline-block font-pops font-bold">Hello...</h4>
                     <IoTriangle className='absolute bottom-[-10px] left-0 text-[#F1F1F1] ' />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">Today, 2:13pm</p>
                  </div>
              {/* recive messages */}
                     {/* sender message */}
              <div className="mt-5 text-right p-[20px]">
                   <div className='relative'>
                   <h4 className="bg-primary py-[20px] px-[52px] text-white inline-block font-pops font-bold">Hello...</h4>
                     <IoTriangle className='absolute bottom-[-10px] right-0 text-primary ' />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">Today, 2:13pm</p>
                  </div>
              {/* sender message */}

              {/* reiver img */}
              <div className="mt-5">
                   <div className='p-3 bg-[#F1F1F1] inline-block'>
                 
                    {/* <img src={img1} className='w-[250px]'></img> */}
                    <ModalImage
                   small={img1}
                  large={img1}
                  className='w-60'
                  />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">Today, 2:13pm</p>
                  </div>
              {/* sender img */}

                      {/* reiver img */}
                      <div className="mt-5 text-right p-[20px]">
                   <div className='p-3 bg-primary inline-block'>
                 
                    {/* <img src={img1} className='w-[250px]'></img> */}
                    <ModalImage
                   small={img1}
                  large={img1}
                  className='w-60'
                  />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">Today, 2:13pm</p>
                  </div>
              {/*sender  img */}
                  
               
               
               </div>
            <div className='py-5 border-t-2 border-gray-500 rounded-lg'>
              <div className=''>
              <input onChange={(e)=> setMsg(e.target.value)} className='bg-[#F1F1F1] w-[650px] p-5 ' type='text'></input>
              <button onClick={handleSendMsg} className='p-5 text-3xl text-primary' ><BsFillSendPlusFill  /></button>
              </div>
            </div>
            </div>


             
         

          
         </div>
       
      
      </>
   )
}

export default Chat
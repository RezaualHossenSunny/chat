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
import { useEffect, useState } from 'react';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import moment from 'moment';
import { getDownloadURL, getStorage, ref as refs, uploadBytes } from "firebase/storage";
import { FcGallery } from "react-icons/fc";
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

const Chat = () => {
   const storage = getStorage();
   const[shoEmoji,setShowwnoj]=useState(false);
   const data=useSelector(state=>state.userLoginInfo.userInfo);
 const [msg,setmsg]=useState('');
 const db = getDatabase();
const activeChat=useSelector(state=> state.activeChatSlice);
console.log(activeChat);
 
   const hadleButton=()=>{
      console.log('iam button');
      if(activeChat.active.status =='single'){
         set(push(ref(db,'activechat/')),{
            msg:msg,
            whosendid:data.uid,
            whoSendName:data.displayName,
            whoReciveId:activeChat.active.id,
            whoRecivename:activeChat.active.name,
            date:`${new Date().getFullYear()	} - ${new Date().getMonth()+1}- ${new Date().getDate()} - ${new Date().getDay()} - ${new Date().getHours()} - ${new Date().getMinutes()} - ${new Date().getSeconds()} `,

         })

      }else{
         console.log('group');
      }
     
   }
   const[singlemsg,setsinglemsg]=useState([]);
   useEffect(()=>{
      const singlechatRef = ref(db, 'activechat/');
      onValue( singlechatRef, (snapshot) => {
    
      let arr= []
      snapshot.forEach((item)=>{

         if(item.val().whosendid == data.uid || item.val().whoReciveId == activeChat.active.id && item.val().whoReciveId == data.uid || item.val().whosendid == activeChat.active.id){
            arr.push(item.val());
         }
        
         
         
         
          
      })
    setsinglemsg(arr)
      });
   },[activeChat])
   

   console.log(singlemsg,'jtgfjgjtgeetjgte');
   
   const handleImg=(e)=>{

const storageRef = refs(storage, 'some-child');

uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
   getDownloadURL(storageRef).then((downloadURL) => {
      set(push(ref(db ,'/activechat')),{
         img:downloadURL,
         whosendid:data.uid,
         whoSendName:data.displayName,
         whoReciveId:activeChat.active.id,
         whoRecivename:activeChat.active.name,
         date:`${new Date().getFullYear()	} - ${new Date().getMonth()+1}- ${new Date().getDate()} - ${new Date().getDay()} - ${new Date().getHours()} - ${new Date().getMinutes()} - ${new Date().getSeconds()} `
      })
    });
});
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
                     <h2 className="font-poppins text-2xl font-semibold">{activeChat.active.name}</h2>
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
               {
                  singlemsg.map((item)=>(
                  item.whosendid== data.uid ?
                  item.msg ?
                  <div className="mt-2 text-right p-[20px]">
                   <div className='relative'>
                   <h4 className="bg-primary py-[20px] px-[52px] text-white inline-block font-pops font-bold">{item.msg}.</h4>
                     <IoTriangle className='absolute bottom-[-10px] right-0 text-primary ' />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">{
                        moment(item.date,"YYYY-MM-DD HH:mm:ss").fromNow()
                     }</p>
                  </div> 
                  :

                <div>
                <div className="mt-5 text-right p-[20px]">
                   <div className='p-3 bg-primary inline-block'>

                    <ModalImage
                   small={item.img}
                  large={item.img}
                  className='w-60'
                  />
                  
                   </div>
                   <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">{ moment(item.date,"YYYY-MM-DD HH:mm:ss").fromNow()}</p>
                  </div>
                </div>
                  
                  
                  :
                  item.msg ?
                  <div className="mt-2">
                   <div className='relative'>
                   <h4 className="bg-[#F1F1F1] py-[20px] px-[52px] inline-block font-pops font-bold">{item.msg}</h4>
                     <IoTriangle className='absolute bottom-[-10px] left-0 text-[#F1F1F1] ' />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">{   moment(item.date,"YYYY-MM-DD HH:mm:ss").fromNow()}</p>
                  </div> 
                  :
                  <div className="mt-5">
                   <div className='p-3 bg-[#F1F1F1] inline-block'>
                 
                 
                    <ModalImage
                   small={item.img}
                  large={item.img}
                  className='w-60'
                  />
                   </div>
                     <p className="font-poppins text-xs font-medium text-[#00000040] mt-2 select-none">{ moment(item.date,"YYYY-MM-DD HH:mm:ss").fromNow()}</p>
                  </div> 
                  ))
               }
                  
               
               </div>
       
            <div className='py-5 border-t-2 border-gray-500 rounded-lg '>
                {
            shoEmoji &&
           <div className='absolute top-[450px] '>
             <EmojiPicker/>
           </div>
         }
              <div className='flex relative'>
       
            <div className='absolute top-[20px] right-[180px] text-3xl text-yellow-500'> 
               <MdEmojiEmotions  onClick={()=> setShowwnoj(!shoEmoji)}/>
            </div>
              <label>
               <input onChange={handleImg} type='file' className='hidden '/>
               <FcGallery  className='absolute top-[20px] right-[140px] text-3xl'/>
            </label>
              <input onChange={(e)=> setmsg(e.target.value)} className='bg-[#C0C0C0] w-[650px] p-5 focus:outline-0 rounded-md border-orange-200 font-serif font-bold ' type='text'></input>
             
              <div>
              <button onClick={hadleButton} className='p-5 text-3xl text-primary rounded-xl bg-slate-300 ml-1' ><BsFillSendPlusFill  /></button>
              </div>
              </div>
            </div>
            </div>


             
         

          
         </div>
       
      
      </>
   )
}

export default Chat
import React, { createRef, useState } from 'react'
import profile from '../../assets/profile.png'
import {AiOutlineHome,AiOutlineMessage} from 'react-icons/ai'
import {IoMdNotificationsOutline} from 'react-icons/io'
import {BiCloudUpload} from 'react-icons/bi'
import {FiSettings,FiLogOut} from 'react-icons/fi'
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginInfo } from '../../Slices/userSlice'
import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { Dna } from  'react-loader-spinner'

const Saidebar = ({active}) => {
  const [loding,setLoding]=useState(false)
  const auth = getAuth();
  const data=useSelector(state=>state.userLoginInfo.userInfo);

  console.log(data.uid,"ddddd");
  
  const storage = getStorage();
  const navigate = useNavigate();
  const dispach= useDispatch();
  const[ProfileUploadModal,setPorifleUploadModal]= useState(false)

  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();



const handleLogout = ()=>{
  console.log('okk');
  signOut(auth).then(() => {
    dispach(userLoginInfo(null));
    localStorage.removeItem('userLoginInfo')
    navigate('/login')
  }).catch((error) => {
    // An error happened.
  });
}
const handleUplioadImg=()=>{
setPorifleUploadModal(true)
}

const handleUplioadImgCancel=()=>{
  setPorifleUploadModal(false);
  setCropData('');
  setImage('')

  }

const handleUploadChange = (e) => {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  console.log(files,'sunny');
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result);
    
  };
  reader.readAsDataURL(files[0]);
};
const getCropData = () => {
  setLoding(true)
  if (typeof cropperRef.current?.cropper !== "undefined") {
    setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

    const storageRef = ref(storage, auth.currentUser.uid);
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
    console.log('Uploaded a data_url string!');
    getDownloadURL(storageRef).then((downloadURL) => {
      console.log('File available at', downloadURL);
      updateProfile(auth.currentUser, {
       
        photoURL: downloadURL
      }).then(()=>{
        setPorifleUploadModal(false);
        setCropData('');
        setImage('')
      })
      setLoding(true)
    });
});

  }
};
  return (
    <div className='bg-primary  rounded-lg pt-[38px]'>
       <div className='relative h-28 w-28 mx-auto group'>
   
        <img src={data.photoURL} alt="" className='mx-auto w-full h-full rounded-full'  />
        <h2 className='text-3xl font-nunito text-white font-bold text-center mt-1 '>{data.displayName}</h2>
        
    

       <div className='absolute top-0 left-0 w-full h-full opacity-0 group-hover:bg-overlay rounded-full flex justify-center items-center group-hover:opacity-100 cursor-pointer'>
       <BiCloudUpload onClick={handleUplioadImg}  className='text-white text-4xl'/>
       </div>
     
       </div>

       

        <div className={`mt-[78px] relative flex justify-center pt-[20px] pb-[25px] after:absolute after:content-[""] after:top-0 after:right-0 ${active=='home' && 'after:bg-white'} after:w-[160px] after:h-full after:z-[-1] z-[1] 
        after:rounded-l-lg before:absolute before: content-[""] before:top-0 before:right-0 before:bg-primary before:w-[8px] before:h-full before:rounded-l-lg`}> 
      <Link to='/'>
      <AiOutlineHome className={`text-5xl ${active=='home' ?'text-primary' :'text-icon'}`}/>
      </Link>
        </div>

        <div className={`mt-[78px] relative flex justify-center pt-[20px] pb-[25px]
        after:absolute after:content-[""] after:top-0 after:right-0 ${active=='message' && 'after:bg-white'} after:w-[160px] after:h-full after:z-[-1] z-[1] after:rounded-l-lg before:absolute before: content-[""] before:top-0 before:right-0 before:bg-primary before:w-[8px] before:h-full before:rounded-l-lg `}>
        <Link to='/message'>
        <AiOutlineMessage className={`text-5xl ${active=='message' ?'text-primary' :'text-icon'}`}/>
        </Link>
        
        </div>

        <div className='mt-[50px] flex justify-center pt-[20px] pb-[25px]'>
  
       <IoMdNotificationsOutline className='text-5xl text-icon'/>
      
        </div>

        <div className='mt-[50px] flex justify-center pt-[20px] pb-[25px]'>
          <FiSettings className='text-5xl text-icon'/>
        </div>
        <div onClick={handleLogout} className='mt-[78px] flex justify-center pt-[20px] pb-[25px]'>
          <FiLogOut className='text-5xl text-icon'/>
        </div>

       {
        ProfileUploadModal &&
        <div className='h-screen w-full bg-primary absolute top-0 left-0 z-50 flex justify-center items-center'>

        <div className='bg-white w-1/3 p-10 rounded'>
          <h2 className='font-open text-hedding font-bold text-3xl'>Upload Profile Picture</h2>
          <div className='relative h-28 w-28 mx-auto group mt-2 overflow-hidden rounded-full'>
          {
            image ?
            <div
            className="img-preview w-full h-full "
            style={{ width: "100%", float: "left", height: "300px" }}
          />
          :
          <img src={data} alt="" className='mx-auto w-full h-full rounded-full'  />
          } 
   
     
       </div>
     
     
          <input onChange={handleUploadChange}   type='file' className='font-open text-hedding font- semi-bold text-[15px] pt-[20px]'/>
          {
            image &&
            
            <Cropper
            className='mt-4'
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
          }
         

   
        

      

         <div className='mt-[20px] '>
         {
          loding ?
          <Dna
  visible={true}
  height="80"
  width="80"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/> :
<button onClick={getCropData} className='font-open font-semiBold font-xl bg-[#3498DB] text-white p-5 text-center rounded-[5px] cursor-pointer'> Upload   </button>
         }
        
   
<button onClick={handleUplioadImgCancel}  className='font-open font-semiBold font-xl bg-[#FF5233] text-white p-5 text-center rounded-[5px] cursor-pointer ml-[10px]'>Cancel </button>
         </div>

         
        </div>

</div>
       }

       
      

    </div>
  )
}

export default Saidebar
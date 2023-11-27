import React, { useState } from 'react';
import {PiEyeClosedLight,PiEyeLight} from 'react-icons/pi'
import {FcGoogle} from 'react-icons/fc'
import { Link ,json,useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../Slices/userSlice';
import { ThreeDots } from  'react-loader-spinner'




const Login = () => {

const [loading,Setloding]=useState(false)
const dispatch= useDispatch()
  const navigate= useNavigate()
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] =useState('');
 
  const [password, setPassword] =useState('');

  const [emailerror, setEmailerror] =useState('');
 
  const [passworderror, setPassworderror] =useState('');
  const [passwordshow, setPasswordshow] =useState(false);

 
  const handleEmail =(e)=>{
    setEmail(e.target.value);
    setEmailerror('');
  }

  const handlePassword =(e)=>{
    setPassword(e.target.value);
    setPassworderror('');
  }

  const handleSubmit = ()=>{
    if(!email){
      setEmailerror('please enter your email');
      
    }
    else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerror('please enter your valid email');
      }
    }


    if(!password){
      setPassworderror('please enter your password');
    }
    else{
      if(!/^(?=.{8,})/.test(password)){
        setPassworderror('please enter your 8 characters password');
        
      }
    }
    if(email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ) {
  Setloding(true)
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
     console.log(user.user);
     dispatch(userLoginInfo(user));

     localStorage.setItem('userLoginInfo',JSON.stringify((user)))

        toast.success('SucessFully Loggin');
      Setloding(true)
       setTimeout(() => {
       navigate('/')
       }, 3000);
      })

      .catch((error) => {
        // poblem
        const errorCode = error.code;
         if(errorCode.includes(" auth/invalid-login-credentials")){
         toast.warn('please enter current email / password')
      }
        // poblem
      });
    
        
    
      }
  }
// google
  const handleGoogle=()=>{
    
    signInWithPopup(auth, provider)
   .then(() => {
      setTimeout(() => {
      navigate('/')
    }, 2000);
  
    
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });
  }

  return (
    <div className='flex '>
      {/* rgi part */}
      <ToastContainer position="top-left" theme="colored" />

        <div className='w-2/4  flex justify-end mt-56 mr-[69px]'>
       
          <div>
          <h3 className='font-open text-hedding font-bold text-3xl'>Login to your account!</h3>
         <div onClick={handleGoogle} className='flex  cursor-pointer mt-4 w-60 py-4 tex-center  rounded-[5px] border border-[#BFBFBF]'>
            <FcGoogle className='mt-2 ml-4'/>
         <h4 className='font-open text-xl text-[#BFBFBF] '>Login with Google</h4>
         </div>


          <div className='mt-16 relative'>
            <input onChange={handleEmail} className='py-6  w-96   border-b border-[#BFBFBF] focus:outline-0 ' type="email" placeholder='enter your email email' />
            <p className='absolute top-[-13px]   font-open font-semibold text-hedding bg-white tracking-wide'>Email Address</p>
            {
              emailerror &&
              <p className='text-red-500 font-bold '>{emailerror}</p>
            }
          </div>

         

          <div className='mt-16 relative'>
            <input onChange={handlePassword} className='py-6  w-96   border-b border-[#BFBFBF] focus:outline-0' type={passwordshow ?'text' :'password'} placeholder='enter your  Password' />
            <p className='absolute top-[-13px]   font-open font-semibold text-hedding bg-white tracking-wide'>Password</p>

           {
            passwordshow ? <PiEyeLight onClick={()=>  setPasswordshow (!passwordshow)} className='absolute top-[30px] right-[60px]'/>
            :
            <PiEyeClosedLight onClick={()=>  setPasswordshow (!passwordshow)} className='absolute top-[30px] right-[60px]'/>
           }
      

          
           {
            passworderror &&
            <p className='text-red-500 font-bold '>{passworderror}</p>
           }
          </div>

          <div className='mt-4'>
          {
            loading ?
            <ThreeDots
              height="80" 
              width="80" 
              radius="9"
              color="#4fa94d" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              />:
              <div onClick={handleSubmit} className='font-open font-semiBold font-xl bg-primary text-white w-96 py-5 text-center rounded-[5px] cursor-pointer'>Login to Continue </div>
          }
           


            <p className='f w-96 ont-open  text-base text-[#03014C]  mt-2 '>Don’t have an account ?  <Link to={'/registison'} className='text-[#EA6C00] font-bold'>Sign In</Link></p>

            <h4 className='font-bold  mt-2 text-base text-[#0000FF] '> <Link to='/forgotpassword'>Forgot Password</Link>   </h4>
          </div>
          </div>

        </div>

        {/* img part */}
        <div className='w-2/4'>
            <img className='w-full h-screen object-cover' src="img/login.png" alt="regi img" />
        </div>
    </div>
  )
}

export default Login
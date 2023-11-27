import React, { useState } from 'react';
import {PiEyeClosedLight,PiEyeLight} from 'react-icons/pi';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification, updateProfile  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import {  Vortex } from  'react-loader-spinner'
const Registion = () => {
  const db = getDatabase();

  const auth = getAuth();
  const navigate =useNavigate(); 
 
  const [loding,setLodin]=useState(false)
  const [email, setEmail] =useState('');
  const [fullname, setFullname] =useState('');
  const [password, setPassword] =useState('');
  const [sucess, setsucess] =useState('');

  const [emailerror, setEmailerror] =useState('');
  const [fullnameerror, setFullnameerror] =useState('');
  const [passworderror, setPassworderror] =useState('');
  const [passwordshow, setPasswordshow] =useState(false);

 
  const handleEmail =(e)=>{
    setEmail(e.target.value);
    setEmailerror('');
  }

  const handleFullname =(e)=>{
    setFullname(e.target.value);
    setFullnameerror('');
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

    if(!fullname){
      setFullnameerror('please enter your full name');
    }
    if(!password){
      setPassworderror('please enter your password');
    }
    else{
      if(!/^(?=.{8,})/.test(password)){
        setPassworderror('please enter your 8 characters password');
        
      }
    }
    if(email && password && fullname && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) ) {
      setLodin(true)
  
    createUserWithEmailAndPassword(auth, email, password)
  .then ((user)=>{
    
    updateProfile(auth.currentUser, {
      displayName: fullname,
      photoURL: "./src/assets/profile.png"
    }).then(() => {
      toast.info('registison done, verify your email');
      console.log('user',user);
      setEmail('');
      setPassword('');
      setFullname('');
      sendEmailVerification(auth.currentUser)
      setLodin(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    }).then(()=>{
      set(ref(db, 'users/'+ user.user.uid), {
        username: user.user.displayName,
        email: user.user.email,
      
      });
      
    
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
    
    
 

 




  }).catch((error)=>{
    if(error.code.includes('auth/email-already-in-use')){
      setEmailerror('this email alredy used');
    }
    
    
  })
      
  
    }
  }

  return (
    <div className='flex '>

      {/* rgi part */}
      <ToastContainer position="top-left" theme="dark"   />

        <div className='w-2/4  flex justify-end mt-56 mr-[69px]'>
          <div>
          <h3 className='font-nunito text-hedding font-bold text-3xl'>Get started with easily register</h3>
          <h4 className='font-nunito text-xl text-[#BFBFBF] mt-3'>Free register and you can enjoy it</h4>
         


          <div className='mt-16 relative'>
            <input onChange={handleEmail}  className='py-6  w-96 px-14 rounded-lg  border border-[#BFBFBF] ' type="email" placeholder=' email' value={email} />
            <p className='absolute top-[-13px] left-[50px] px-1.5 font-nunito font-semibold text-hedding bg-white tracking-wide'>Email Address</p>
            {
              emailerror &&
              <p className='text-red-500 font-bold '>{emailerror}</p>
            }
          </div>

          <div className='mt-16 relative'>
            <input onChange={handleFullname} className='py-6  w-96 px-14 rounded-lg  border border-[#BFBFBF] ' type="text" placeholder=' Ful name' value={fullname} />
            <p className='absolute top-[-13px] left-[50px] px-1.5 font-nunito font-semibold text-hedding bg-white tracking-wide'>Ful name</p>
            {
              fullnameerror &&
              <p className='text-red-500 font-bold '>{fullnameerror}</p>
            }
          </div>

          <div className='mt-16 relative'>
            <input onChange={handlePassword} className='py-6  w-96 px-14 rounded-lg  border border-[#BFBFBF] ' type={passwordshow ?'text' :'password'} placeholder='Password' value={password} />
            <p className='absolute top-[-13px] left-[50px] px-1.5 font-nunito font-semibold text-hedding bg-white tracking-wide'>Password</p>

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
              loding ?
              <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
:
<div onClick={handleSubmit} className='font-nunito font-semiBold font-xl bg-primary text-white w-96 py-5 text-center rounded-[86px] cursor-pointer'>Sign up</div>
            }
           

            <p className='f w-96 ont-open  text-base text-[#03014C]  mt-2 text-center'>Already  have an account ? <Link to={'/login'} className='text-[#EA6C00] font-bold'>Sign In</Link></p>
          </div>
          </div>

          

        

          



        </div>

        {/* img part */}
        <div className='w-2/4'>
            <img className='w-full h-screen object-cover' src="img/regi.png" alt="regi img" />
        </div>
    </div>
  )
}

export default Registion
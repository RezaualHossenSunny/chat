import React from 'react'
import {BsSearch} from 'react-icons/bs'
import {PiDotsThreeVerticalBold} from 'react-icons/pi'
const Serch = () => {
  return (
    <div className='relative'>
        <input type="text" className='shadow-shadow py-5 px-[50px] w-full rounded-lg' />
<div className='flex justify-between absolute  top-[27%] left-0  w-full px-[10px]'>
<BsSearch className='text-3xl'/>
<PiDotsThreeVerticalBold className='text-3xl text-primary'/>
</div>
    </div>
  )
}

export default Serch
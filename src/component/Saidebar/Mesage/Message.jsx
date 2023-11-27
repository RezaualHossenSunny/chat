import React from 'react'
import Saidebar from '../Saidebar'
import Serch from '../Serch/Serch'
import Grouplist from '../Grouplist/Grouplist'
import Friendrequst from '../FriendRequest/Friendrequst'
import { Friends } from '../Fridends/Friends'
import Group from '../Group/Group'
import UserList from '../UserList/UserList'
import Blocked from '../Blocked/Blocked'
import Chat from '../Chat/Chat'

const Message = () => {
  return (
    <div>
         <div className='flex gap-x-[100px] mt-[32px] '>
      <div className='w-[187px] ml-[32px] '>
  <Saidebar active='message'/>
      </div>
      <div className='w-[427px]'>
        <Serch/>
        <Friends/>
        <Group/>
      </div>
      <div className='w-[854px]'>
       <Chat/>
      </div>
    
    </div>
    </div>
  )
}

export default Message
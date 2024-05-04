import React from 'react'
import Logo from '../Logo/Logo'
import Navbar from './Navbar'
import { ModeToggle } from '../Toggle-themes'

export default function Header({Links}) {
  return (
    <div className="w-full h-14 bg-secondary flex justify-between items-center px-6 ">
     <Logo/>
    
    <div className='flex gap-4 ' >
     
    <Navbar Links={Links}/>
    <ModeToggle/>
    </div>
        
     </div>
  )
}

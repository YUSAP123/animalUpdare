// import ModeToggle from '@/components/theme/ModeToggle'
import Header from '@/components/Navbar/Header'
import SideBar from '@/components/SideBar'
import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'


const Links= [{name: 'view clan', Link: "/clan"},{name: 'add clan', Link: "/clan/addclan"}]
const SideLinks= [{name: 'Home', Link: "/"},{name: 'Services', Link: "/Service"}]



export default function RootLayout({children,}:{
    children:React.ReactNode
}){
    return (
<html lang='en'>
    <body>
    <div className="grid grid-cols-12 bg-grey-800 w-full min-h-screen overflow-hidden h-full">
      <div className="col-span-2 bg-secondary h-full ">
        <SideBar link={SideLinks}/>
      </div>
      <div className="col-span-10">
   <Header Links={Links}/>
    <div className="flex  gap-4 p-6">
        {children}
        </div></div></div>
    </body>
</html>
    )
}
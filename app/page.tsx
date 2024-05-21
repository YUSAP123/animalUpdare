import Logo from '@/components/Logo/Logo'
import Header from '@/components/Navbar/Header'
import Navbar from '@/components/Navbar/Navbar'
import SideBar from '@/components/SideBar'
import InforCards from '@/components/infoCards/InforCards'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
const Links= [{name: 'Home', Link: "/"},{name: 'Services', Link: "/Service"}]
const SideLinks= [{name: 'Home', Link: "/"},{name: 'Services', Link: "/Service"}]

export default async function page() {
  // const route = useRouter()
  // const serverSession = useSession()
  const session =await getServerSession(authOptions)
  if(session===null){

    return redirect("/auth/login")
  }
  // Links.forEach(e=>console.log(e))
  return (
<div className="grid grid-cols-12 bg-grey-800 w-full min-h-screen overflow-hidden h-full">
      <div className="col-span-2 bg-secondary h-full ">
        <SideBar link={SideLinks}/>
      </div>
      <div className="col-span-10">
   <Header Links={Links}/>
    <div className="flex gap-4 p-6">
      {/* <Card className='px-4'>
        <CardHeader className='font-bold'>
          CLAN INFORMATION
        </CardHeader>
        <CardContent>
          Available Clans: 0
        </CardContent>
        <CardFooter className='flex justify-end'>Read more</CardFooter>
      </Card> */}
      <InforCards header={"CLAN INFORMATION"} content={"Available Clans: "+ 0} link={"/clan"}/>
      <InforCards header={"MATING POSSIBILITY"} content={10} link={"/Possible"}/>
      <InforCards header={"VIEW PROGRESS"} content={10} link={"/Possible"}/>
    </div>
      </div>
     </div>
  )
}

// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UrlObject } from 'url'

export default function SideBar({link}) {
    console.log(link)
  return (
    <div >
        <div className='grid justify-center mt-6'> 
        <Avatar>
      <AvatarImage src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fpng%2F24280396-funny-bunny-or-baby-rabbit-for-easter-day-on-isolated-background-ai-generated&psig=AOvVaw0i5D3HAjiJ-GyBCG9V1LAS&ust=1714470590941000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCdn-6S54UDFQAAAAAdAAAAABAE" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>

        </div>
        <div className='flex flex-col px-4 gap-6 mt-16'>
{link.map((e: { link: React.Key | null | undefined; Link: string | UrlObject; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined })=> <Link key={e.link}  className="text-primary hover:text-primary-foreground" href={e.Link}>{e.name}</Link>)}
    </div>
    </div>
  )
}

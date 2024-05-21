import Link from 'next/link'
import React from 'react'
import { UrlObject } from 'url'

export default function Navbar(props: { Links: any[] }) {
    // console.log(props.Links/)
  return (
    <div className="flex mx-2 gap-4 ">
        {props.Links && props.Links.map( (e: { Link: string | UrlObject; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => <Link className='text-primary capitalize hover:text-primary-foreground' href={e.Link}>{e.name}</Link>)}
       
    </div>
  )
}

import Link from 'next/link'
import React from 'react'

export default function Navbar(props) {
    // console.log(props.Links/)
  return (
    <div className="flex mx-2 gap-4 ">
        {props.Links && props.Links.map( e => <Link className='text-primary hover:text-primary-foreground' href={e.Link}>{e.name}</Link>)}
       
    </div>
  )
}

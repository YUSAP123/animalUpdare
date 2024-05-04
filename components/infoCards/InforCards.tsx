import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Link from 'next/link'

export default function InforCards({header, content, link}) {
  return (
    <div><Card className='px-4'>
    <CardHeader className='font-bold'>
      {header}
    </CardHeader>
    <CardContent>
      {content}
    </CardContent>
    <CardFooter className='flex justify-end'>
        <Link href={link}>Read more</Link>
    </CardFooter>
  </Card></div>
  )
}

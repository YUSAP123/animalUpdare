"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Register from "@/components/auth/Register"

const formSchma = z.object({
    name: z.string().min(2, {message: 'please'}).max(50, {message: 'please'}),
    username: z.string().min(2).max(50),
})

export default function page() {

    const form  = useForm<z.infer<typeof formSchma>>({
        resolver: zodResolver(formSchma),
    })


    const onsubmit = (value: z.infer<typeof formSchma>)=>{
        console.log(value)
    }
   
  return (
    <div className='grid item-center'>
        <h3 className="text-center text-primary text-3xl font-bold uppercase py-6">Register</h3>
    <div>
        {/* <Register/>
         */}

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
                
            <FormField
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="capitalize">full name</FormLabel>
      <FormControl>
        <Input placeholder="enter name" {...field} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="capitalize">Username</FormLabel>
      <FormControl>
        <Input placeholder="enter username" {...field} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  )}
/>
<Button type="submit">submit</Button>



            </form>
         </Form>
    </div>
    </div>
  )
}

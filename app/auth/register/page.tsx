"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import z from 'zod'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Register from "@/components/auth/Register"
import { POST } from "@/app/api/user/route"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

const formSchma = z.object({
  fullName: z.string().min(2, {message: 'please'}).max(50, {message: 'please'}),
  phoneNumber: z.coerce.number(),
  userName: z.string().min(2, {message: 'please'}).max(50, {message: 'please'}),
  password: z.string().min(2).max(50),
})

export default function page() {
 const {toast}= useToast()
 const route=useRouter()
    const form  = useForm<z.infer<typeof formSchma>>({
        resolver: zodResolver(formSchma),
    })


    const onsubmit = async (value: z.infer<typeof formSchma>)=>{
        console.log(value)
        const responce= await fetch("/api/user", {method: "POST" , body: JSON.stringify(value)})
        const a=await responce.json()
        if (responce.ok) {
         toast({title: "success", description: "successfully registered", variant: "default"}) 
         route.push("/auth/login") 
        }
        // console.log(responce)
        if (responce.status === 500) {
          // console.log('rrrrr')su
          toast({title: "Failed", description: a.message, variant: "destructive"}) 
        }
        if(responce.status===404){
          toast({title: "Failed", description: a.message, variant: "destructive"})  
        }
    }
   
  return (
    <div className='grid item-center'>
        <h3 className="text-center text-primary text-3xl font-bold uppercase py-6">Register</h3>
    <div>
        {/* <Register/>
         */}

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="flex flex-col gap-6 p-6 pr-64">
                
            <FormField
  control={form.control}
  name="fullName"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="capitalize">fullname</FormLabel>
      <FormControl>
        <Input placeholder="enter fullname" {...field} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="phoneNumber"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="capitalize">phonenumber</FormLabel>
      <FormControl>
        <Input type="number" placeholder="enter phonenumber" {...field} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="userName"
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

<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="capitalize">password</FormLabel>
      <FormControl>
        <Input type="password" placeholder="enter password" {...field} />
      </FormControl>
      {/* <FormDescription>This is your public display name.</FormDescription> */}
      <FormMessage />
    </FormItem>
  )}
/>
<div className="grid justify-start">
<Button type="submit">Register</Button>
</div>




            </form>
         </Form>
    </div>
    </div>
  )
}

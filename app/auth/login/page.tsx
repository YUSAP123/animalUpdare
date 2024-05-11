"use client"
import {signIn} from 'next-auth/react'
import {zodResolver} from "@hookform/resolvers/zod"
import z from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Register from "@/components/auth/Register"
import { redirect } from 'next/dist/server/api-utils'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'


const formSchma = z.object({
    username: z.string().min(2, {message: 'please'}).max(50, {message: 'please'}),
    password: z.string().min(2).max(50),
})

export default function page() {
 const {toast}= useToast()
 const route =useRouter()
    const form  = useForm<z.infer<typeof formSchma>>({
        resolver: zodResolver(formSchma),
    })


    const onsubmit = async(value: z.infer<typeof formSchma>)=>{
    const signIndata=await signIn('credentials', {
      userName: value.username,
      password: value.password,
      redirect: false
  
    })
    if(signIndata?.error){
      toast({title:"Failed", description:signIndata.error, variant: "destructive"})
    }

else{
route.push("/")
}
       
    }
   
  return (
    <div className='grid item-center'>
        <h3 className="text-center text-primary text-3xl font-bold uppercase py-6">login</h3>
    <div>
        {/* <Register/>
         */}

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="flex flex-col gap-6 p-6 pr-64">
                
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
<Button type="submit">Login</Button>
</div>




            </form>
         </Form>
    </div>
    </div>
  )
}

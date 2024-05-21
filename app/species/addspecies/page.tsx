'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const formschema=z.object({
  name: z.string().optional(),
  nickName: z.string().optional(),
  isNew: z.boolean().optional()
})
export default function page() {
  const {toast}= useToast()
  const form =useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema)
  })

  const onclick =async(values: z.infer<typeof formschema>)=>{
  const response= await fetch(process.env.NEXT_PUBLIC_URL + "/api/species", {
    method: "POST",
    body: JSON.stringify(values)
  })
  const b=await response.json()
    if (response.ok) {
   toast({
    title: "success",
    description: b.message
  }) 
  }
  }
  return (
    <div>
      <Form {...form}>
        <form onClick={form.handleSubmit(onclick)}> 
        <FormField 
        name='name'
        control={form.control}
        render={({field})=>(
          <FormItem>
            <FormLabel>name</FormLabel>
            <FormControl>
              <Input placeholder="enter name" {...field}/>
            </FormControl>
          </FormItem>
        )}
        />

<FormField 
        name='nickName'
        control={form.control}
        render={({field})=>(
          <FormItem>
            <FormLabel>nickname</FormLabel>
            <FormControl>
              <Input placeholder="enter nickname" {...field}/>
            </FormControl>
          </FormItem>
        )}
        />
        <Button type='submit'>Submit</Button>
        </form>

      </Form>
    </div>
  )
}

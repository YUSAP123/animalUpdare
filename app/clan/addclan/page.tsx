"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    name: z.coerce.number(),
    nickName: z.string().optional()
    
})

export default function page() {
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{

        }
    })

    const onsubmit = async (value: z.infer<typeof formSchema>)=>{
        console.log(value)


        
        
        const response = await fetch('/api/clan', {
            method: 'POST',
            body: JSON.stringify(value)

        },)

        const b = await response.json()
        if (response.ok) {
            toast({
                title: "success",
                description: "clan added "
            })
        }else{
            toast({
                title: "failed",
                description: b.message,
                variant: "destructive"
            })
        }

    }
  return (
    <div className='w-full'>
        <h3 className="text-center uppercase py-4 w-full text-primary text-3xl font-black">
            register clan
        </h3>
        <Form {...form}>
           <form className='grid gap-4' onSubmit={form.handleSubmit(onsubmit)} >
            <FormField
            name="name"
            control={form.control}
            render={({field})=>(
                <FormItem>
                    <FormLabel className='capitalize'>name</FormLabel>
                    <FormControl>
                        <Input type='input' placeholder='enter name' {...field} />
                    </FormControl>
                </FormItem>
            )}
            />

<FormField
            name="nickName"
            control={form.control}
            render={({field})=>(
                <FormItem>
                    <FormLabel className='capitalize'>nickname</FormLabel>
                    <FormControl>
                        <Input type='text' placeholder='optional name' {...field} />
                    </FormControl>
                </FormItem>
            )}
            />

           <div className="flex items-start">
           <Button type='submit'>register clan</Button>
           </div>
            </form> 
        </Form>
    </div>
  )
}

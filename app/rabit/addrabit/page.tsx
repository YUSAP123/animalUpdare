"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { boolean, z } from 'zod'

const formSchema = z.object({
    name: z.string().optional(),
    ClanId: z.coerce.number(),
})


interface ClanInterface {
    name: number,
    nickName: string
}


export default function page() {
    const {toast} = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{

        }
    })

    const [clan, setclan] = useState<ClanInterface[]>([])

    useEffect(() => {
     const getClan = async ()=>{
        const b = await fetch(process.env.NEXT_PUBLIC_URL + "api/clan" , {
            method: 'GET',
            cache: "no-store"
        })
            const c = await b.json()
        if (b.ok) {
            setclan(c.message)
        }
     }

     getClan()
    }, [])
    



    const onsubmit = async (value: z.infer<typeof formSchema>)=>{
        console.log(value)


        
        
        const response = await fetch('/api/rabit', {
            method: 'POST',
            body: JSON.stringify(value)

        },)

        const b = await response.json()
        if (response.ok) {
            toast({
                title: "success",
                description: "rabit added "
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
          control={form.control}
          name="ClanId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>clan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a clan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {clan && clan.map(e=> <SelectItem value={`${e.name}`}>{e.nickName}</SelectItem>)}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

           <div className="flex items-start">
           <Button type='submit'>register new rabit</Button>
           </div>
            </form> 
        </Form>
    </div>
  )
}

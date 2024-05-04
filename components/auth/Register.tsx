import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
// import { Input } from 'postcss'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formChima = z.object({
    name: z.string().min(2).max(50),
    username: z.string().min(2).max(50),
    phonenumber: z.coerce.number().max(50),
    password: z.string().min(2).max(50),
})


export default function Register() {
    const form = useForm<z.infer<typeof formChima>>({
        resolver: zodResolver(formChima),
        defaultValues: {}
    })
    const onsubmit = (values: z.infer<typeof formChima>)=>{
console.log(values)
    }
  return (
    <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)}>
                <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Full Name" {...field}/>
                            <FormMessage/>
                        </FormControl>
                    </FormItem>
                )}/>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageError } from '@/components/ui/MessageError'

const schema = z.object({
  username: z.string().min(1, 'El username es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    if (data.username === 'jonathan' && data.password === 'jonathan1') {
      localStorage.setItem('isAuth', 'true')
      router.push('/dashboard')
    } else {
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className='mx-auto max-w-[600px]'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <input
          className='border border-gray-300 p-2 rounded-lg'
          type='text'
          {...register('username')}
          placeholder='Username'
        />
        {errors.username && <MessageError error={errors.username.message} />}

        <input
          className='border border-gray-300 p-2 rounded-lg'
          type='password'
          {...register('password')}
          placeholder='Password'
        />
        {errors.password && <MessageError error={errors.password.message} />}

        {error && <MessageError error={error} />}

        <button
          className={`border-2 w-auto text-center  rounded-lg px-3 py-2  cursor-pointerborder-green-600 text-green-400 hover:bg-green-600 hover:text-green-200`}
          type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

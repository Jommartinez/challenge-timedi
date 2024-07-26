'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth')
    if (!isAuth) {
      router.push('/login')
    }
  }, [router])

  return (
    <>
      <div>{children}</div>
    </>
  )
}

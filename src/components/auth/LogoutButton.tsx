'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isAuth')
    router.push('/login')
  }

  return (
    <div
      onClick={handleLogout}
      className='group cursor-pointer relative h-8 w-40 overflow-hidden rounded-lg bg-red-500 text-sm font-bold text-white flex justify-center items-center'>
      Logout
      <div className='absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30'></div>
    </div>
  )
}

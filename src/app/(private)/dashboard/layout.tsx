import { LogoutButton } from '@/components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dispenser App - Login',
  description: 'Login page',
  icons: {
    icon: '/favicon.png',
  },
}

export default function DashbaordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=' max-w-[1200px] mx-auto px-4 mb-8'>
      <div className='flex items-center justify-between border-b py-4 mb-4'>
        <h1 className='text-4xl'>Beer Tap Dispenser</h1>
        <LogoutButton />
      </div>
      <div>{children}</div>
    </div>
  )
}

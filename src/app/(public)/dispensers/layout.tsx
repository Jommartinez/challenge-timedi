import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dispenser App - publico',
  description: 'Aplicación púbica para controlar los dispensadores de cerveza',
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
      <div>{children}</div>
    </div>
  )
}

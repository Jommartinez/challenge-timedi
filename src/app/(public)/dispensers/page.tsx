'use client'
import { useEffect, useState } from 'react'
import { fetchDispensers } from '@/utils/dispensers'

import { Dispenser } from '@/types'
import Link from 'next/link'
import { CardInfoSimple } from '@/components'

export default function DispensersPage() {
  const [dispensers, setDispensers] = useState<Dispenser[]>([])

  useEffect(() => {
    loadDispensers()
  }, [])

  const loadDispensers = async () => {
    const data = await fetchDispensers()
    setDispensers(data)
  }

  return (
    <div>
      <h1 className='text-2xl mt-6 text-center mb-8'>
        Dispensadores de cerveza
      </h1>
      <section className='flex flex-col gap-1'>
        {dispensers.map(({ id, status }, index) => (
          <Link key={id} href={`/dispensers/${id}`}>
            <CardInfoSimple id={index + 1} status={status} />
          </Link>
        ))}
      </section>
    </div>
  )
}

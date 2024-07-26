'use client'
import { ButtonBack } from '@/components'
import { Dispenser } from '@/types'
import { getOppositeStatus } from '@/utils'
import { fetchDispensers, updateDispenserStatus } from '@/utils/dispensers'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function InfoDispenserPage() {
  const params = useParams()
  const id = params.id as string
  const [infoDispenser, setInfoDispenser] = useState<Dispenser>()

  useEffect(() => {
    loadDispenserData()
  }, [id])

  const loadDispenserData = async () => {
    const data = await fetchDispensers()
    const info = data.find((dispenser) => dispenser.id === id)
    setInfoDispenser(info)
  }

  const handleStatus = async (status: string) => {
    try {
      await updateDispenserStatus(id, status)
      setInfoDispenser((prev) => (prev ? { ...prev, status } : undefined))
    } catch (error) {
      console.error('Error updating:', error)
    }
  }

  return (
    <>
      <h2 className='text-2xl mt-6 text-center mb-8'>Dispensador</h2>
      <Link className='flex justify-center mb-12' href='/dispensers'>
        <ButtonBack />
      </Link>
      <div className='flex justify-center'>
        <div
          onClick={() =>
            handleStatus(getOppositeStatus(infoDispenser?.status || ''))
          }
          className={`border-2 w-40 text-center  rounded-lg px-3 py-2  cursor-pointer  ${
            infoDispenser?.status === 'open'
              ? 'border-red-600 text-red-400 hover:bg-red-600 hover:text-red-200'
              : 'border-green-600 text-green-400 hover:bg-green-600 hover:text-green-200'
          }`}>
          {infoDispenser?.status === 'open' ? 'Close' : 'Open'}
        </div>
      </div>
    </>
  )
}

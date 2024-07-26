'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchDispensers, createDispenser } from '@/utils/dispensers'
import type { Dispenser } from '@/types'
import { CardInfoSimple } from '@/components'

export default function DashboardPage() {
  const [flowVolume, setFlowVolume] = useState('')
  const [dispensers, setDispensers] = useState<Dispenser[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    loadDispensers()
  }, [])

  const loadDispensers = async () => {
    const data = await fetchDispensers()
    setDispensers(data)
  }

  const handleCreateDispenser = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await createDispenser(parseFloat(flowVolume))
    if (success) {
      setFlowVolume('')
      loadDispensers()
      setIsModalOpen(false)
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-2 mb-8'>
        <h2 className='text-xl mt-6 text-center'>Listado de dispensadores</h2>

        <div
          onClick={() => setIsModalOpen(true)}
          className='group cursor-pointer relative h-8 w-48 overflow-hidden rounded-lg bg-blue-500 text-sm font-bold text-white flex justify-center items-center self-center'>
          crear nuevo dispensador
          <div className='absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30'></div>
        </div>
      </div>

      <section className='flex flex-col gap-1'>
        {dispensers.map(({ id, status }, index) => (
          <Link key={id} href={`/dashboard/dispenser/${id}`}>
            <CardInfoSimple id={index + 1} status={status} />
          </Link>
        ))}
      </section>

      {isModalOpen && (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10'>
          <div className='max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
            <div className='w-full'>
              <div className='m-8 my-20 max-w-[400px] mx-auto relative'>
                <button
                  className='absolute -top-16 -right-16 cursor-pointer text-xl'
                  onClick={() => setIsModalOpen(false)}>
                  X
                </button>
                <div className='mb-8'>
                  <h1 className='mb-4 text-3xl font-extrabold text-center'>
                    Crear dispensador
                  </h1>
                  <p className='text-gray-600'>
                    Introduce el volumen de flujo del dispensador en litros por
                    segundo
                  </p>
                </div>
                <div className='space-y-4'>
                  <form onSubmit={handleCreateDispenser}>
                    <input
                      className='w-full p-2 border border-gray-300 rounded-lg'
                      type='number'
                      step='0.0001'
                      value={flowVolume}
                      onChange={(e) => setFlowVolume(e.target.value)}
                      placeholder='Flow Volume'
                    />
                    <button
                      type='submit'
                      className='group mt-2 cursor-pointer relative h-10 w-full overflow-hidden rounded-lg bg-blue-500 text-sm font-bold text-white flex justify-center items-center self-center'>
                      Crear dispensador
                      <div className='absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30'></div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

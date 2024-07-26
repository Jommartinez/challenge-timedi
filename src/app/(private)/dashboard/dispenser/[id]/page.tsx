'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchDispenserData } from '@/utils/dispensers'
import type { DispenserData } from '@/types'
import { ButtonBack, CardInfo } from '@/components'

export default function DispenserPage() {
  const params = useParams()
  const id = params.id as string
  const [dispenserData, setDispenserData] = useState<DispenserData | null>(null)

  useEffect(() => {
    loadDispenserData()
  }, [id])

  const loadDispenserData = async () => {
    const data = await fetchDispenserData(id)
    setDispenserData(data)
  }

  return (
    <div className=''>
      <Link className='button' href='/dashboard'>
        <ButtonBack />
      </Link>
      <h2 className='text-xl mt-6 text-center'>Detalles del dispensador</h2>

      <p className='text-sm text-center'>ID: {id}</p>
      {!!dispenserData?.amount && (
        <p>Ganancia total: {dispenserData?.amount} €</p>
      )}
      {!!dispenserData?.usages[0]?.flow_volume && (
        <p>Litros por segundo: {dispenserData?.usages[0]?.flow_volume}</p>
      )}

      <h3 className='text-xl my-2'>Historial de uso</h3>
      {dispenserData?.usages && dispenserData.usages.length > 0 ? (
        <section className='flex gap-1 flex-col mx-auto'>
          {dispenserData.usages.map((usage, index) => (
            <CardInfo key={`${id}-${index + 1}`} id={index + 1} usage={usage} />
          ))}
        </section>
      ) : (
        <p>No hay datos de uso</p>
      )}
    </div>
  )
}

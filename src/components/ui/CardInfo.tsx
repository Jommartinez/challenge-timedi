import { Usage } from '@/types'
import { formatDate } from '@/utils'

interface CardInfoProps {
  id: number
  usage: Usage
}

export const CardInfo = ({ id, usage }: CardInfoProps) => {
  return (
    <article className='flex border justify-between items-center rounded-lg p-2'>
      <p>Tirada {id}</p>
      <p>{usage.total_spent} €</p>
      <div>
        <p className='text-xs'>{formatDate(usage.opened_at)}</p>
        <p className='text-xs'>{formatDate(usage.closed_at)}</p>
      </div>
    </article>
  )
}

export const CardInfoSimple = ({
  id,
  status,
}: {
  id: number
  status: string
}) => {
  return (
    <article className='flex border justify-between items-center rounded-lg p-2'>
      <p>Dispensador {id}</p>
      <span
        className={`${status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
        {status}
      </span>
    </article>
  )
}

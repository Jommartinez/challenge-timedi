import { format } from 'date-fns'

export const getOppositeStatus = (status: string): string => {
  return status === 'open' ? 'close' : 'open'
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return format(date, 'dd/MM/yyyy HH:mm:ss')
}

import type { Dispenser, DispenserData } from '@/types'

export const fetchDispensers = async (): Promise<Dispenser[]> => {
  try {
    const response = await fetch('/api/dispenser/')
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export const createDispenser = async (flowVolume: number): Promise<boolean> => {
  try {
    const response = await fetch('/api/dispenser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flow_volume: flowVolume }),
    })
    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}

export const fetchDispenserData = async (
  id: string
): Promise<DispenserData | null> => {
  try {
    const response = await fetch(`/api/dispenser/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export const updateDispenserStatus = async (
  id: string,
  status: string
): Promise<void> => {
  const url = `/api/dispenser/${id}`
  const body = {
    status,
    updated_at: new Date().toISOString(),
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

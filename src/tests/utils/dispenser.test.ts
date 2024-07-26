import type { Dispenser, DispenserData } from '@/types'
import {
  createDispenser,
  fetchDispenserData,
  fetchDispensers,
  updateDispenserStatus,
} from '@/utils/dispensers'

describe('fetchDispensers', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('fetches data successfully', async () => {
    const mockData: Dispenser[] = [
      {
        id: 'b3ea6cde-c60d-4c68-b42f-1964205d557f',
        status: 'open',
        updated_at: '2022-01-01T02:00:00Z',
      },
    ]

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      json: async () => mockData,
    })

    const data = await fetchDispensers()
    expect(data).toEqual(mockData)
    expect(global.fetch).toHaveBeenCalledWith('/api/dispenser/')
  })

  test('returns empty array on network error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('Network error'))

    const data = await fetchDispensers()
    expect(data).toEqual([])
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})

describe('createDispenser', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('returns true when creation is successful', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    })

    const result = await createDispenser(0.0014)
    expect(result).toBe(true)
    expect(global.fetch).toHaveBeenCalledWith('/api/dispenser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flow_volume: 0.0014 }),
    })
  })

  test('returns false on network error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('Network error'))

    const result = await createDispenser(0.0014)
    expect(result).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})

describe('fetchDispenserData', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('fetches data successfully', async () => {
    const mockData: DispenserData = {
      amount: 392.0,
      usages: [
        {
          opened_at: '2024-07-24T13:16:05.928901Z',
          closed_at: '2024-07-24T13:16:10.928901Z',
          flow_volume: 0.012,
          total_spent: 61.25,
        },
      ],
    }

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const id = 'b3ea6cde-c60d-4c68-b42f-1964205d557f'
    const data = await fetchDispenserData(id)
    expect(data).toEqual(mockData)
    expect(global.fetch).toHaveBeenCalledWith(`/api/dispenser/${id}`)
  })

  test('returns null on network error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('Network error'))

    const id = 'b3ea6cde-c60d-4c68-b42f-1964205d557f'
    const data = await fetchDispenserData(id)
    expect(data).toBeNull()
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})

describe('updateDispenserStatus', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('sends PUT request with correct parameters', async () => {
    const id = 'b3ea6cde-c60d-4c68-b42f-1964205d557f'
    const status = 'open'
    const expectedBody = {
      status,
      updated_at: new Date().toISOString(),
    }

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
    })

    await updateDispenserStatus(id, status)

    expect(global.fetch).toHaveBeenCalledWith(`/api/dispenser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expectedBody),
    })
  })

  test('handles fetch error', async () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('Network error'))

    const id = 'b3ea6cde-c60d-4c68-b42f-1964205d557f'
    const status = 'closed'

    await updateDispenserStatus(id, status)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})

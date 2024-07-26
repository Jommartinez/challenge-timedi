import { POST } from '@/app/api/login/route'
import { NextResponse } from 'next/server'

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn(),
  },
}))

describe('POST handler', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const mockRequest: any = {
    json: async () => ({ username: 'jonathan', password: 'jonathan1' }),
  }
  const mockRequestWrong: any = {
    json: async () => ({ username: 'wrong', password: 'wrong' }),
  }
  test('returns success for correct credentials', async () => {
    await POST(mockRequest)
    expect(NextResponse.json).toHaveBeenCalledWith({ success: true })
  })

  test('returns failure for incorrect credentials', async () => {
    await POST(mockRequestWrong)

    expect(NextResponse.json).toHaveBeenCalledWith(
      { success: false },
      { status: 401 }
    )
  })
})

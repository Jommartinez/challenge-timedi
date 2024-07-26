import { getOppositeStatus } from '@/utils'

describe('getOppositeStatus', () => {
  test('returns "close" when input is "open"', () => {
    expect(getOppositeStatus('open')).toBe('close')
  })

  test('returns "open" when input is "close"', () => {
    expect(getOppositeStatus('close')).toBe('open')
  })

  test('returns "open" for any other input', () => {
    expect(getOppositeStatus('unknown')).toBe('open')
    expect(getOppositeStatus('')).toBe('open')
  })
})

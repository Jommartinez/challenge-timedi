import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardInfo, CardInfoSimple } from '@/components'

describe('CardInfo', () => {
  const mock = {
    opened_at: '2024-07-24T13:16:40.928901Z',
    closed_at: '2024-07-24T13:16:45.928901Z',
    flow_volume: 0.012,
    total_spent: 61.25,
  }

  test('renders correctly', () => {
    render(<CardInfo id={1} usage={mock} />)
    expect(screen.getByText('Tirada 1')).toBeInTheDocument()
    expect(screen.getByText('61.25 €')).toBeInTheDocument()
    expect(screen.getByText('24/07/2024 15:16:40')).toBeInTheDocument()
    expect(screen.getByText('24/07/2024 15:16:45')).toBeInTheDocument()
  })
})

describe('CardInfoSimple', () => {
  test('renders correctly with open status', () => {
    render(<CardInfoSimple id={1} status='open' />)

    expect(screen.getByText('Dispensador 1')).toBeInTheDocument()
    const statusElement = screen.getByText('open')
    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-green-500')
  })

  it('renders correctly with closed status', () => {
    render(<CardInfoSimple id={2} status='closed' />)

    expect(screen.getByText('Dispensador 2')).toBeInTheDocument()
    const statusElement = screen.getByText('closed')
    expect(statusElement).toBeInTheDocument()
    expect(statusElement).toHaveClass('text-red-500')
  })
})

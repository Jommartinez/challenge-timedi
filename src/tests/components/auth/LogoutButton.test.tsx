import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { LogoutButton } from '@/components'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LogoutButton', () => {
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {}
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString()
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  })()

  Object.defineProperty(window, 'localStorage', { value: localStorageMock })

  const mockPush = jest.fn()
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
    })
  })

  test('renders correctly', () => {
    render(<LogoutButton />)
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  test('handles logout correctly', () => {
    render(<LogoutButton />)
    const button = screen.getByText('Logout')

    localStorage.setItem('isAuth', 'true')
    fireEvent.click(button)
    expect(localStorage.getItem('isAuth')).toBeNull()
    expect(mockPush).toHaveBeenCalledWith('/login')
  })
})

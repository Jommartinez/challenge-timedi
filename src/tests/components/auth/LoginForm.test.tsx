import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

global.fetch = jest.fn()

describe('LoginForm', () => {
  const mockPush = jest.fn()
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    jest.resetAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
    })
  })

  it('renders form elements correctly', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('displays validation errors for empty fields', async () => {
    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText('El username es obligatorio')).toBeInTheDocument()
      expect(
        screen.getByText('La contraseña es obligatoria')
      ).toBeInTheDocument()
    })
  })

  it('submits the form with valid data', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: true,
    })

    render(<LoginForm />)
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'jonathan' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'jonathan1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'jonathan', password: 'jonathan1' }),
      })
      expect(localStorage.getItem('isAuth')).toBe('true')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('displays error message on failed login', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockResolvedValueOnce({
      ok: false,
    })

    render(<LoginForm />)
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText('Credenciales incorrectas')).toBeInTheDocument()
    })
  })

  it('displays error message on network error', async () => {
    const mockFetch = global.fetch as jest.Mock
    mockFetch.mockRejectedValue(new Error('Network error'))

    render(<LoginForm />)
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText('Error al iniciar sesión')).toBeInTheDocument()
    })
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BookingModal from './BookingModal'

describe('BookingModal component', () => {
  it('disables submit when room or guestName are empty', () => {
    const onBook = vi.fn()
    const onClose = vi.fn()

    render(<BookingModal x={0} y={0} onBook={onBook} onClose={onClose} />)

    const bookButton = screen.getByRole('button', { name: /book/i })
    expect((bookButton as HTMLButtonElement).disabled).toBe(true)
  })

  it('calls onBook with values when form is submitted', () => {
    const onBook = vi.fn()
    const onClose = vi.fn()

    render(<BookingModal x={0} y={0} onBook={onBook} onClose={onClose} />)

    fireEvent.change(screen.getByPlaceholderText(/room number/i), {
      target: { value: '101' }
    })
    fireEvent.change(screen.getByPlaceholderText(/name and surname/i), {
      target: { value: 'John Doe' }
    })

    const bookButton = screen.getByRole('button', { name: /book/i })
    expect((bookButton as HTMLButtonElement).disabled).toBe(false)

    fireEvent.click(bookButton)

    expect(onBook).toHaveBeenCalledWith('101', 'John Doe')
  })
})
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ResortMap from './ResortMap'

vi.mock('../api', () => ({
  fetchMap: vi.fn(),
  bookCabana: vi.fn(),
}))

import { fetchMap, bookCabana } from '../api'

beforeEach(() => {
  vi.clearAllMocks()
  ;(fetchMap as unknown as { mockResolvedValue: (value: any) => void }).mockResolvedValue({
    tiles: [
      [{ x: 0, y: 0, type: 'cabana', booked: false }],
    ]
  })
  ;(bookCabana as unknown as { mockResolvedValue: (value: any) => void }).mockResolvedValue({ success: true })
  vi.spyOn(window, 'alert').mockImplementation(() => undefined)
})

describe('ResortMap component', () => {
  it('loads map, opens modal on cabana click, and books cabana', async () => {
    render(<ResortMap />)

    await waitFor(() => expect(fetchMap).toHaveBeenCalled())

    const cabana = screen.getByAltText('cabana')
    fireEvent.click(cabana)

    expect(screen.getByText(/book cabana/i)).toBeTruthy()

    fireEvent.change(screen.getByPlaceholderText(/room number/i), { target: { value: '101' } })
    fireEvent.change(screen.getByPlaceholderText(/name and surname/i), { target: { value: 'John Doe' } })

    fireEvent.click(screen.getByRole('button', { name: /book/i }))

    await waitFor(() => expect(bookCabana).toHaveBeenCalledWith({ x: 0, y: 0, room: '101', guestName: 'John Doe' }))
    expect(window.alert).toHaveBeenCalledWith('Booked successfully!')
  })
})
import { describe, it, expect } from 'vitest'
import { BookingService } from '../src/bookingService'

const guests = [
  { room: '101', guestName: 'John Doe' },
  { room: '202', guestName: 'Jane Smith' }
]

describe('BookingService', () => {
  it('books an available cabana for a valid guest', () => {
    const service = new BookingService(guests)
    const result = service.bookCabana(1, 1, '101', 'John Doe')
    expect(result).toEqual({ success: true })
    expect(service.isBooked(1, 1)).toBe(true)
  })

  it('rejects booking for invalid guest credentials', () => {
    const service = new BookingService(guests)
    const result = service.bookCabana(1, 2, '999', 'Fake Guest')
    expect(result).toEqual({ error: 'Invalid room or guest name' })
    expect(service.isBooked(1, 2)).toBe(false)
  })

  it('rejects booking an already booked cabana', () => {
    const service = new BookingService(guests)
    service.bookCabana(2, 2, '202', 'Jane Smith')
    const result = service.bookCabana(2, 2, '202', 'Jane Smith')
    expect(result).toEqual({ error: 'Cabana already booked' })
  })
})
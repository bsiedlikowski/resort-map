import { Guest, Booking } from "./types"

export class BookingService {
  private bookings = new Map<string, Booking>() // In-memory storage for current session
  private guests: Guest[]

  constructor(guests: Guest[]) {
    this.guests = guests
  }

  // Helper to generate a unique key for coordinates
  private cabanaKey(x: number, y: number) {
    return `${x}-${y}`
  }
  // Validates guest credentials and creates a booking
  bookCabana(x: number, y: number, room: string, guestName: string) {
    // Verify if guest matches the records
    const guest = this.guests.find(
        g => g.room === room && g.guestName.toLowerCase().trim() === guestName.toLowerCase().trim()
    )
    if (!guest) return { error: "Invalid room or guest name" }

    const key = this.cabanaKey(x, y)
    if (this.bookings.has(key)) return { error: "Cabana already booked" }

    this.bookings.set(key, { x, y, room, guestName })
    return { success: true }
  }

  isBooked(x: number, y: number) {
    return this.bookings.has(this.cabanaKey(x, y))
  }
}
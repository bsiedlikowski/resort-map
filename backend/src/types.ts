export type TileType = "empty" | "cabana" | "pool" | "path" | "chalet"

export interface Tile {
  x: number
  y: number
  type: TileType
  booked?: boolean
}

export interface Guest {
  room: string
  guestName: string
}

export interface Booking {
  room: string
  guestName: string
  x: number
  y: number
}
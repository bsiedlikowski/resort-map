import express from 'express';
import cors from 'cors';
import fs from "fs"
import { parseArgs } from "node:util"
import { parseMap } from "./mapService"
import { BookingService } from "./bookingService"
import { Guest } from "./types"

// Przy starcie app do testowania i w trybie produkcyjnym:
// - createApp() zwraca Express app i stan BookingService (testy potrzebują)
// - w run.sh i zegarkach używamy globalnej instancji z domyślnymi ścieżkami / lokalnymi
export function createApp({ mapFile = '../map.ascii', bookingsFile = '../bookings.json' } = {}) {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const guests: Guest[] = JSON.parse(fs.readFileSync(bookingsFile, "utf-8"))
  const tiles = parseMap(mapFile)
  const bookingService = new BookingService(guests)

  app.get("/api/map", (req, res) => {
    const mapWithBookings = tiles.map(row =>
      row.map(tile => ({
        ...tile,
        booked: tile.type === "cabana" ? bookingService.isBooked(tile.x, tile.y) : undefined
      }))
    )
    res.json({ tiles: mapWithBookings })
  })

  app.post("/api/book", (req, res) => {
    const { x, y, room, guestName } = req.body

    if (typeof x !== "number" || typeof y !== "number" || !room || !guestName) {
      return res.status(400).json({ error: "Missing or invalid parameters" })
    }

    const targetTile = tiles[y]?.[x];
    if (!targetTile || targetTile.type !== "cabana") {
      return res.status(400).json({ error: "Selected tile is not a cabana" });
    }

    const result = bookingService.bookCabana(x, y, room, guestName)
    if ("error" in result) return res.status(400).json(result)

    res.json(result)
  })

  return { app, bookingService }
}

if (require.main === module) {
  const { values } = parseArgs({
    options: {
      map: { type: 'string', default: '../map.ascii' },
      bookings: { type: 'string', default: '../bookings.json' },
    },
    strict: false
  });
  const mapFile = values.map as string
  const bookingsFile = values.bookings as string

  const { app } = createApp({ mapFile, bookingsFile })
  const port = 3001
  app.listen(port, () => console.log(`Backend running on port ${port}`))
}
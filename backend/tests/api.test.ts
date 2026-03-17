import request from 'supertest'
import { describe, it, expect, beforeEach } from 'vitest'
import { createApp } from '../src/index'
import fs from 'fs'

const mapText = 'W\n' // single cabana at (0,0)
const mapFile = 'tests/test-map.ascii'
const bookingsFile = 'tests/test-bookings.json'

beforeEach(() => {
  fs.writeFileSync(mapFile, mapText)
  fs.writeFileSync(bookingsFile, JSON.stringify([{ room: '101', guestName: 'John Doe' }]))
})

describe('Backend API', () => {
  it('returns map with cabana tile and initial booked false', async () => {
    const { app } = createApp({ mapFile, bookingsFile })
    const res = await request(app).get('/api/map')
    expect(res.status).toBe(200)
    expect(res.body.tiles[0][0]).toMatchObject({ type: 'cabana', booked: false })
  })

  it('books cabana with valid credentials', async () => {
    const { app } = createApp({ mapFile, bookingsFile })
    const bookRes = await request(app)
      .post('/api/book')
      .send({ x: 0, y: 0, room: '101', guestName: 'John Doe' })
    expect(bookRes.status).toBe(200)
    expect(bookRes.body).toEqual({ success: true })

    const mapRes = await request(app).get('/api/map')
    expect(mapRes.body.tiles[0][0].booked).toBe(true)
  })

  it('rejects booking non-cabana tile', async () => {
    const { app } = createApp({ mapFile, bookingsFile })
    const response = await request(app)
      .post('/api/book')
      .send({ x: 1, y: 0, room: '101', guestName: 'John Doe' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Selected tile is not a cabana' })
  })

  it('rejects invalid guest for booking', async () => {
    const { app } = createApp({ mapFile, bookingsFile })
    const response = await request(app)
      .post('/api/book')
      .send({ x: 0, y: 0, room: '000', guestName: 'Wrong Name' })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'Invalid room or guest name' })
  })
})
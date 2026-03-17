import type { TileData, BookingResponse } from "./types";

const API_URL = "http://localhost:3001/api";

export async function fetchMap(): Promise<{ tiles: TileData[][] }> {
  const res = await fetch(`${API_URL}/map`);
  if (!res.ok) throw new Error("Failed to fetch map");
  return res.json();
}

export async function bookCabana(data: { x: number, y: number, room: string, guestName: string }): Promise<BookingResponse> {
  const res = await fetch(`${API_URL}/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
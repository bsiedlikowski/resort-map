export type TileType = "empty" | "cabana" | "pool" | "path" | "chalet";

export interface TileData {
  x: number;
  y: number;
  type: TileType;
  booked?: boolean;
}

export interface BookingResponse {
  success?: boolean;
  error?: string;
}
import fs from "fs"
import { Tile, TileType } from "./types"

//Converts ASCII file content into a 2D array of tile objects.
export function parseMap(path: string): Tile[][] {
  const content = fs.readFileSync(path, "utf-8")
  return content
  .split("\n")
  .filter(row => row.trim().length > 0)
  .map((row, y) =>
    row.split("").map((char, x) => ({
      x,
      y,
      type: charToTile(char)
    }))
  )
}

function charToTile(char: string): TileType {
  switch (char.toUpperCase()) {
    case "W": return "cabana"
    case "P": return "pool"
    case "#": return "path"
    case "C": return "chalet"
    case ".": return "empty"
    default: return "empty"
  }
}
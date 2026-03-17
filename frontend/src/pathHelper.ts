import type { TileData } from "./types";

// Determines the correct path sprite and rotation based on neighbour path tiles
export function getPathAsset(x: number, y: number, grid: TileData[][]) {
  // Check if a neighbor exists and is a path type
  const isPath = (dx: number, dy: number) => grid[y + dy]?.[x + dx]?.type === "path";

  const n = isPath(0, -1); // North
  const s = isPath(0, 1);  // South
  const e = isPath(1, 0);  // East
  const w = isPath(-1, 0); // West

  const neighborsCount = (n ? 1 : 0) + (s ? 1 : 0) + (e ? 1 : 0) + (w ? 1 : 0);

  // 4 way intersection
  if (neighborsCount === 4) return { src: "arrowCrossing.png", rot: 0 };

  // T intersection
  if (neighborsCount === 3) {
    if (!n) return { src: "arrowSplit.png", rot: 90 }; // T-junction w dół
    if (!s) return { src: "arrowSplit.png", rot: 270 };   // T-junction w górę
    if (!e) return { src: "arrowSplit.png", rot: 180 }; // T-junction w lewo
    if (!w) return { src: "arrowSplit.png", rot: 0 };  // T-junction w prawo
  }

  // Straight or corners
  if (neighborsCount === 2) {
    if (n && s) return { src: "arrowStraight.png", rot: 0 };
    if (e && w) return { src: "arrowStraight.png", rot: 90 };

    // corner  orientations
    if (n && e) return { src: "arrowCornerSquare.png", rot: 0 };
    if (e && s) return { src: "arrowCornerSquare.png", rot: 90 };
    if (s && w) return { src: "arrowCornerSquare.png", rot: 180 };
    if (w && n) return { src: "arrowCornerSquare.png", rot: 270 };
  }

  // Dead ends
  if (neighborsCount === 1) {
    if (n) return { src: "arrowEnd.png", rot: 180 };
    if (e) return { src: "arrowEnd.png", rot: 270 };
    if (s) return { src: "arrowEnd.png", rot: 0 };
    if (w) return { src: "arrowEnd.png", rot: 90 };
  }

  // Isolated paths
  return { src: "arrowEnd.png", rot: 0 };
}
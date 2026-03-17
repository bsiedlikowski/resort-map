import { useEffect, useState } from "react";
import { fetchMap, bookCabana } from "../api";
import type { TileData, TileType } from "../types";
import CabanaTile from "./CabanaTile";
import BookingModal from "./BookingModal";
import { getPathAsset } from "../pathHelper";

// Mapping tile types to their assets
const DEFAULT_IMAGES: Record<TileType, string | null> = {
  cabana: "/assets/cabana.png",
  chalet: "/assets/houseChimney.png",
  empty: null,
  pool: null,
  path: "/assets/arrowStraight.png",
};

export default function ResortMap() {
  const [mapData, setMapData] = useState<TileData[][] | null>(null);
  const [selected, setSelected] = useState<{ x: number, y: number } | null>(null);

  //Initial data loading and manual refresh trigger 
  const loadMap = async () => {
    try {
      const data = await fetchMap();
      setMapData(data.tiles);
    } catch (err) {
      alert("Failed to connect to server");
    }
  };

  useEffect(() => { loadMap(); }, []);

  // Cabana reservation and refreshes map on success
  const handleBook = async (room: string, guestName: string) => {
    if (!selected) return;

    const res = await bookCabana({ ...selected, room, guestName });
    if (res.success) {
      alert("Booked successfully!");
      setSelected(null);
      loadMap(); 
    } else {
      alert(res.error || "Booking failed");
    }
  };

  if (!mapData) return <div className="resort-container">Loading resort...</div>;
  const columns = mapData[0]?.length || 0;

  // Helper to check if a neighboring tile is water for pool edge calculations
  const isWater = (x: number, y: number) => mapData[y]?.[x]?.type === "pool";

  return (
    <div className="resort-container">
      <h1 style={{ marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Resort Map
      </h1>

      {selected && (
        <BookingModal
          x={selected.x} y={selected.y}
          onClose={() => setSelected(null)}
          onBook={handleBook}
        />
      )}

      <div className="map-grid" style={{ gridTemplateColumns: `repeat(${columns}, 40px)` }}>
        {mapData.flat().map((tile) => {
          let currentImg = DEFAULT_IMAGES[tile.type] || null;
          let currentRotation = 0;
          let dynamicStyles: React.CSSProperties = {};

          // Path Asset Logic: Determines correct sprite and rotation based on neighbors
          if (tile.type === "path") {
            const pathData = getPathAsset(tile.x, tile.y, mapData);
            currentImg = `/assets/${pathData.src}`;
            currentRotation = pathData.rot;
          }

          // Water Border Logic: Adds inset shadows when next to non-water tiles
          if (tile.type === "pool") {
            currentImg = null;
            const shadows: string[] = [];
            if (!isWater(tile.x, tile.y - 1)) shadows.push("inset 0 1.5px 0 0 #505050");
            if (!isWater(tile.x, tile.y + 1)) shadows.push("inset 0 -1.5px 0 0 #505050");
            if (!isWater(tile.x - 1, tile.y)) shadows.push("inset 1.5px 0 0 0 #505050");
            if (!isWater(tile.x + 1, tile.y)) shadows.push("inset -1.5px 0 0 0 #505050");
            dynamicStyles.boxShadow = shadows.join(", ");
          }

          return (
            <CabanaTile
              key={`${tile.x}-${tile.y}`}
              {...tile}
              imgSrc={currentImg}
              rotation={currentRotation}
              customStyles={dynamicStyles}
              onClick={(x, y) => setSelected({ x, y })}
            />
          );
        })}
      </div>
    </div>
  );
}
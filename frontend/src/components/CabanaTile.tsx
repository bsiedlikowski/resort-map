import type { TileData } from "../types";
import "../App.css";

interface Props extends TileData {
    imgSrc: string | null;
    rotation: number;
    onClick: (x: number, y: number) => void;
    customStyles?: React.CSSProperties;
}

export default function CabanaTile({ type, booked, x, y, imgSrc, rotation, onClick, customStyles }: Props) {

    // Assign dynamic CSS classes based on tile type and availability
    let tileClass = "tile";
    if (type === "cabana") {
        tileClass += booked ? " tile-cabana-booked" : " tile-cabana-free";
    } else if (type === "pool") {
        tileClass += " tile-water";
    }

    return (
        <div
            className={tileClass}
            style={customStyles}
            // Only allow interaction if it's a cabana that isn't already booked
            onClick={() => type === 'cabana' && !booked && onClick(x, y)}
        >
            {imgSrc && (
                <img
                    src={imgSrc}
                    alt={type}
                    style={{ transform: `rotate(${rotation}deg)`, objectFit: 'contain' }}
                />
            )}
        </div>
    );
}
import { useState } from "react";
import "../App.css";

interface Props {
  x: number;
  y: number;
  onClose: () => void;
  onBook: (room: string, guestName: string) => void;
} 

export default function BookingModal({ x, y, onClose, onBook }: Props) {
  const [room, setRoom] = useState("");
  const [guestName, setGuestName] = useState("");

  const isInvalid = !room.trim() || !guestName.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInvalid) onBook(room, guestName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Book Cabana ({x}, {y})</h3>
        
        <form onSubmit={handleSubmit}>
          <input 
            className="modal-input"
            type="text"
            placeholder="Room number" 
            value={room} 
            onChange={e => setRoom(e.target.value)} 
          />
          
          <input 
            className="modal-input"
            type="text"
            placeholder="Name and surname" 
            value={guestName} 
            onChange={e => setGuestName(e.target.value)} 
          />
          
          <div className="modal-actions">
            <button type="submit" className="btn-book" disabled={isInvalid}>
              Book
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default function TravelCard({ travel, onSelect }) {
    return (
        <div>
            <h3>{travel.destination}</h3>
            <p>₹ {travel.price}</p>
            <p>⭐ {travel.rating}</p>

            <button onClick={() => onSelect(travel._id)}>
                View Details
            </button>
        </div>
    );
}
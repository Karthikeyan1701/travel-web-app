import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTravelsQuery } from '../features/travels/travelsApi';
import TravelCard from '../components/TravelCard';

export default function Travels() {
  const navigate = useNavigate();

  // RTK Query - Server state
  const { travelData, isLoading, error } = useGetTravelsQuery();

  // UI state
  const [maxPrice, setMaxPrice] = useState(1500);

  // Derived UI state
  const filteredTravels = useMemo(() => {
    if (!travelData?.data) return [];
    return travelData.data.filter((travel) => travel.price <= maxPrice);
  }, [travelData, maxPrice]);

  // Navigation Handler
  const handleSelectTravel = useCallback(
    (id) => {
      navigate(`/travels/${id}`);
    },
    [navigate]
  );

  // Loading and error handling
  if (isLoading) return <p>Loading travels....</p>;
  if (error) return <p>Failed to load travels</p>;

  return (
    <div>
      <h1>Travels</h1>

      <input 
        type="number" 
        value={maxPrice} 
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />

      {filteredTravels.map((travel) => (
        <TravelCard
          key={travel._id} 
          travel={travel}
          onSelect={handleSelectTravel}
        />
      ))}
    </div>
  );
}

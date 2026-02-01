import { useParams } from "react-router-dom";
import { useGetTravelsQuery } from "../features/travels/travelsApi";
import { useCreateBookingMutation } from "../features/bookings/bookingsApi";
import { useState } from "react";
import TravelDetailsSkeleton from "../components/skeletons/TravelDetailsSkeleton";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function TravelDetails() {
    const { id } = useParams();

    // Fetch all travels
    const { data, isLoading, error } = useGetTravelsQuery();

    // Booking mutation
    const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

    // UI only state
    const [selectedDate, setSelectedDate] = useState("");
    const [uiError, setUiError] = useState(null);

    if (isLoading) return <TravelDetailsSkeleton />;
    if (error) {
        return <ErrorMessage message='Failed to load travel details' />;
    }

    const travel = data?.data.find((t) => t._id === id);

    if (!travel) return <p>Travel not found</p>;

    const handleBook = async () => {
        if (!selectedDate) {
            setUiError('Please select a date');
            return;
        }

        setUiError(null);

        try {
            await createBooking({
                travelId: id,
                date: selectedDate,
            }).unwrap();
        } catch (err) {
            setUiError(
                err?.data?.message || 'Something went wrong while booking'
            );
        }
    };

    return (
        <div>
            <h1>{travel.destination}</h1>
            <p>Price: ₹{travel.price}</p>
            <p>Rating: {travel.rating}</p>

            <h3>Available Dates</h3>
            <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            >
                <option value="">Select a date</option>
                {travel.availableDates.map((date) => (
                    <option key={date} value={date}>
                        {date}
                    </option>
                ))}
            </select>

            <br /><br />

            <button onClick={handleBook} disabled={isBooking}>
                {isBooking ? 'Booking...' : 'Book Now'}
            </button>

            {/* Error Handling */}
            {uiError && <p className='text-red-600'>{uiError}</p>}
        </div>
    );
}
import { useReducer, useState } from "react";
import {
    useCreateBookingMutation, 
    useGetBookingsQuery, 
    useCancelBookingMutation
} from "../features/bookings/bookingsApi";
import BookingsSkeleton from "../components/skeletons/BookingsSkeleton";
import ErrorMessage from "../components/ui/ErrorMessage";

// Initial State
const initialState = { step: "IDLE" };

// Reducer function
function bookingReducer(state, action) {
    switch (action.type) {
        case 'START_BOOKING':
            return { step: 'CONFIRMING' };
        case 'FINISH_BOOKING':
            return { step: 'DONE' };        
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

export default function Bookings() {
    const [state, dispatch] = useReducer(bookingReducer, initialState);
    const [cancellingId, setCancellingId] = useState(null);
    const [uiError, setUiError] = useState(null);

    // RTK Query Hooks
    const { 
        data, 
        isLoading: isBookingsLoading,
        error: bookingsError
    } = useGetBookingsQuery();

    const [createBooking, { isLoading: isBooking, error: createError }] = useCreateBookingMutation();

    const [cancelBooking, { isLoading: isCancelling, error: cancelError }] = useCancelBookingMutation();

    const handleBook = async () => {
        setUiError(null);
        dispatch({ type: 'START_BOOKING' });

        try {
            await createBooking({
                travelId: '123',
                date: '2026-03-15',
            }).unwrap();

            dispatch({ type: 'FINISH_BOOKING' });
        } catch (err) {
            setUiError(
                err?.data?.message || 'Failed to create booking'
            );
            dispatch({ type: 'RESET' });
        }
    };

    const handleCancel = async (bookingId) => {
        setUiError(null);
        setCancellingId(bookingId);

        try { 
            await cancelBooking(bookingId).unwrap();
        } catch (err) { 
            setUiError(
                err?.data?.message || 'Failed to cancel booking'
            );
        } finally {
            setCancellingId(null);
        }
    };

    if (isBookingsLoading) return <BookingsSkeleton />;

    if (bookingsError) {
        return <ErrorMessage message='Failed to load bookings' />
    }

    return (
        <div>
            <h2>Bookings</h2>

            {/* MUTATION ERRORS */}
            <ErrorMessage 
                message={
                    uiError || 
                    createError?.data?.message || 
                    cancelError?.data?.message
                }
            />

            {/* CREATE BOOKING */}
            {state.step === "IDLE" && (
                <button
                    onClick={handleBook}
                    disabled={isBooking}
                >
                    {isBooking ? "Booking..." : "Book Travel"}
                </button>
            )}

            {state.step === "DONE" && (
                <button
                    onClick={() => dispatch({ type: 'RESET' })}
                >
                    Book Another
                </button>
            )}

            <hr />

            {/* EXISTING BOOKINGS */}
            <h3>My Bookings</h3>

            {data.data.length === 0 && <p>No bookings found</p>}

            {data?.data?.map((booking) => (
                <div key={booking._id}>
                    <p>Destination: {booking.travel.destination}</p>
                    <p>Status: {booking.status}</p>

                    {booking.status === 'CONFIRMED' && (
                        <button 
                            onClick={() => handleCancel(booking._id)}
                            disabled={isCancelling && cancellingId === booking._id}
                        >
                            {isCancelling && cancellingId === booking._id
                                ? 'Cancelling...'
                                : 'Cancel'}
                        </button>
                    )}

                    {booking.status === 'PENDING' && <p>Processing...</p>}
                    {booking.status === 'CANCELLED' && <p>Cancelled</p>}
                    {booking.status === 'FAILED' && <p>Payment Failed</p>}
                </div>
            ))}
        </div>
    );
}
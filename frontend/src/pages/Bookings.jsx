import { useReducer } from "react";

// Initial State
const initialState = {
    step: "IDLE",    // IDLE | SELECT_DATE | CONFIRMING | SUCCESS | ERROR
    selectedDate: null,
    error: null,
};

// Reducer function
function bookingReducer(state, action) {
    switch (action.type) {
        case "SELECT_DATE":
            return {
                ...state,
                step: "SELECT_DATE",
                selectedDate: action.payload,
                error: null,
            };
        
        case "CONFIRM":
            return {
                ...state,
                step: "CONFIRMING",
            };
        
        case "SUCCESS":
            return {
                ...state,
                step: "SUCCESS",
            };
            
        case "ERROR":
            return {
                ...state,
                step: "ERROR",
                error: action.payload,
            };
        
        case "RESET":
            return initialState;

        default:
            return state;
    }
}

export default function Bookings() {
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    return (
        <div>
            <h2>Booking Flow</h2>

            {/* IDLE STATE */}
            {state.step === "IDLE" && (
                <button
                    onClick={() =>
                        dispatch({
                            type: "SELECT_DATE",
                            payload: "2026-03-15",
                        })
                    }
                >
                    Select Date
                </button>
            )}

            {/* DATE SELECTED */}
            {state.step === "SELECT_DATE" && (
                <>
                    <p>Selected Date: {state.selectedDate}</p>
                    <button onClick={() => dispatch({ type: "CONFIRM" })}>
                        Confirm Booking
                    </button>
                </>
            )}

            {/* CONFIRMING STATE */}
            {state.step === "CONFIRMING" && (
                <>
                    <p>Processing booking...</p>
                    <button onClick={() => dispatch({ type: "SUCCESS" })}>
                        Simulate Success
                    </button>
                    <button
                        onClick={() => 
                            dispatch({
                                type: "ERROR",
                                payload: "Payment failed",
                            })
                        }
                    >
                        Simulate Error
                    </button>
                </>
            )}

            {/* SUCCESS STATE */}
            {state.step === "SUCCESS" && (
                <>
                    <p>Booking Successful</p>
                    <button onClick={() => dispatch({ type: "RESET" })}>
                        Book Another
                    </button>
                </>
            )}

            {/* ERROR STATE */}
            {state.step === "ERROR" && (
                <>
                    <p>Error: {state.error}</p>
                    <button onClick={() => dispatch({ type: "RESET" })}>
                        Try Again
                    </button>
                </>
            )}
        </div>
    );
}
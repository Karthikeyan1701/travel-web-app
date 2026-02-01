import { apiSlice } from '../api/apiSlice';

export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => '/bookings',
      providesTags: ['Bookings'],
    }),

    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Bookings'],
    }),

    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Bookings'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
} = bookingsApi;

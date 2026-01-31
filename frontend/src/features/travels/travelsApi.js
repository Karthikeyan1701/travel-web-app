import { apiSlice } from "../api/apiSlice";

export const travelsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTravels: builder.query({
            query: () => '/travels'
        }),
    }),
});

export const { useGetTravelsQuery } = travelsApi;

import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";//slice with endpoints dealing with async requests


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

    login: builder.mutation({
        query:(data)=> ({
        url: `${USERS_URL}/auth`,
        method:'POST',
        body: data,
        }),
        keepUnusedDataFor:5
    }),
    register:builder.mutation({
        query:(data) => ({
            url: `${USERS_URL}`,
            method:'POST',
            body:data,
        }),   
    }),
    logout: builder.mutation({
        query: () => ({
        url: `${USERS_URL}/logout`,
        method:`POST`,
        })
    })

   
}),

});

export const {useLoginMutation,useLogoutMutation,useRegisterMutation} = usersApiSlice;


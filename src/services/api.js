import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["CurrUser", "Documents"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "users/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error) => (error ? [] : ["CurrUser"]),
    }),
    register: builder.mutation({
      query: ({ username, password }) => ({
        url: "users/",
        method: "POST",
        body: { username, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/auth/logout",
        method: "GET",
      }),
      invalidatesTags: (result, error) => (error ? [] : ["CurrUser"]),
    }),
    getCurrentUser: builder.query({
      query: () => `/users/me`,
      providesTags: ["CurrUser"],
    }),
    getAllDocuments: builder.query({
        query: () => '/documents',
        providesTags: ["Documents"]
    }),
    createDocuments: builder.mutation({
        query: ()=> ({
            url: "/documents",
            method: "POST"
        }),
        invalidatesTags: ["Documents"]
    }),
    getSingleDocument: builder.query({
      query: ({id})=> `/documents/${id}`
    }),
    updateDocument: builder.mutation({
      query: ({id, title})=> ({
        url: `/documents/${id}`,
        method: "PATCH",
        body: {title}
      })
    })
  }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetAllDocumentsQuery,
  useCreateDocumentsMutation,
  useUpdateDocumentMutation,
  useGetSingleDocumentQuery

} = api;

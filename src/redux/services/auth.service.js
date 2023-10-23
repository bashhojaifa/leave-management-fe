import { api } from "../base-query"
import { getUserProfile, userLogin } from "./auth.slice"

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body
                }
            },
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(userLogin(data.data.accessToken))
                    window.location.href = "/"
                } catch (error) {
                    console.log(error)

                }
            }
        }),

        getUser: build.query({
            query: () => {
                return {
                    url: "/users/profile",
                    method: "GET"
                }
            },
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(getUserProfile(data.data))
                } catch (error) {
                    console.log(error)

                }
            }
        })
    }),
})

export const { useLoginMutation, useGetUserQuery } = authApi
import { api } from "../base-query";

export const leaveApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLeaves: build.query({
      query: ({ id, sort = "descending" }) => `/leaves/${id}?sort=${sort}`,
      transformResponse(data) {
        return data.data;
      },
    }),

    leaveCreate: build.mutation({
      query: (body) => ({
        url: "/leaves",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaves", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    leaveUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/leaves/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaves", data.admin, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              draft[index] = data;
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    leaveDelete: build.mutation({
      query: (id) => ({
        url: "/leaves/" + id,
        method: "DELETE",
      }),
      async onQueryStarted({ setDeleteModal }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getLeaves", data.admin, (draft) => {
              return draft.filter((item) => item._id !== data._id);
            })
          );
          setDeleteModal(false);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useLeaveCreateMutation,
  useLeaveUpdateMutation,
  useLeaveDeleteMutation,
} = leaveApi;

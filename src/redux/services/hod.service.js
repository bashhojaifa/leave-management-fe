import { api } from "../base-query";

export const hodApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHods: build.query({
      query: (id) => "/hods/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    hodCreate: build.mutation({
      query: ({ body }) => ({
        url: "/hods",
        method: "POST",
        body,
      }),
      async onQueryStarted(
        { handleSubmitStatus },
        { queryFulfilled, dispatch }
      ) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getHods", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
          handleSubmitStatus();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    hodUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/hods/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ setOpen }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getHods", data.admin, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              draft[index] = data;
            })
          );
          setOpen(false);
        } catch (error) {
          console.log(error);
        }
      },
    }),
    hodDelete: build.mutation({
      query: (body) => ({
        url: "/hods/" + body.id,
        method: "DELETE",
      }),
      async onQueryStarted(
        { setOpenDeleteModal },
        { queryFulfilled, dispatch }
      ) {
        try {
          const {
            data: {
              data: { hod },
            },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getHods", hod.admin, (draft) => {
              return draft.filter((item) => item._id !== hod._id);
            })
          );
          setOpenDeleteModal(false);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetHodsQuery,
  useHodCreateMutation,
  useHodUpdateMutation,
  useHodDeleteMutation,
} = hodApi;

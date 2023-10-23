import { api } from "../base-query";

export const departmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query({
      query: (id) => "/departments/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    departmentCreate: build.mutation({
      query: ({ body }) => ({
        url: "/departments",
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
            api.util.updateQueryData("getDepartments", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
          handleSubmitStatus();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    departmentUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/departments/" + id,
        method: "PATCH",
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
            api.util.updateQueryData("getDepartments", data.admin, (draft) => {
              const index = draft.findIndex((item) => item._id === data._id);
              draft[index] = data;
            })
          );
          handleSubmitStatus();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    departmentDelete: build.mutation({
      query: ({ id }) => ({
        url: "/departments/" + id,
        method: "DELETE",
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
            api.util.updateQueryData("getDepartments", data.admin, (draft) => {
              return draft.filter((item) => item._id !== data._id);
            })
          );
          handleSubmitStatus();
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useDepartmentCreateMutation,
  useDepartmentUpdateMutation,
  useDepartmentDeleteMutation,
} = departmentApi;

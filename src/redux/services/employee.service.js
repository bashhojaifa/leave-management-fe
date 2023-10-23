import { api } from "../base-query";

export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: (id) => "/employees/" + id,
      transformResponse(data) {
        return data.data;
      },
    }),

    employeeCreate: build.mutation({
      query: ({ body }) => ({
        url: "/employees",
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
            api.util.updateQueryData("getEmployees", data.admin, (draft) => {
              draft.unshift(data);
            })
          );
          handleSubmitStatus();
        } catch (error) {
          console.log(error);
        }
      },
    }),
    employeeUpdate: build.mutation({
      query: ({ id, body }) => ({
        url: "/employees/" + id,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ setOpen }, { queryFulfilled, dispatch }) {
        try {
          const {
            data: { data },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData("getEmployees", data.admin, (draft) => {
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
    employeeDelete: build.mutation({
      query: (body) => ({
        url: "/employees/" + body.id,
        method: "DELETE",
      }),
      async onQueryStarted(
        { setOpenDeleteModal },
        { queryFulfilled, dispatch }
      ) {
        try {
          const {
            data: {
              data: { employee },
            },
          } = await queryFulfilled;
          dispatch(
            api.util.updateQueryData(
              "getEmployees",
              employee.admin,
              (draft) => {
                return draft.filter((item) => item._id !== employee._id);
              }
            )
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
  useGetEmployeesQuery,
  useEmployeeCreateMutation,
  useEmployeeUpdateMutation,
  useEmployeeDeleteMutation,
} = employeeApi;

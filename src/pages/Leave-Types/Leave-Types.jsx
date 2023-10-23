import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";

import * as yup from "yup";
import FormComponent from "../../components/Form/Form";
import {
  useLeaveTypesCreateMutation,
  useLeaveTypesUpdateMutation,
  useGetLeaveTypesQuery,
  useLeaveTypesDeleteMutation,
} from "../../redux/services/leave-type.service";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
const schema = yup
  .object({
    leaveTypes: yup.string().required(),
  })
  .required();

const LeaveType = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { user } = useAuth();
  const { data: leaveTypes, isLoading } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const [
    leaveTypeCreate,
    { isLoading: createLeaveTypeLoading, isSuccess: createLeaveTypesSuccess },
  ] = useLeaveTypesCreateMutation();

  const [
    updateLeaveType,
    { isLoading: updateLeaveTypeLoading, isSuccess: updateLeaveTypesSuccess },
  ] = useLeaveTypesUpdateMutation();

  const [deleteLeaveType, { isLoading: deleteLeaveTypeLoading }] =
    useLeaveTypesDeleteMutation();

  //edit state
  const [defaultValues, setDefaultValues] = useState({
    leaveTypes: "",
  });

  const handleSubmitStatus = () => {
    setOpenDeleteModal(false);
    setIsUpdate(false);
    setActiveId("");
    setDefaultValues({
      leaveTypes: "",
    });
  };

  const submitHandler = (data) => {
    data.admin = user.admin;
    data.name = data.leaveTypes;
    delete data.leaveTypes;
    if (!isUpdate) {
      leaveTypeCreate({ body: data, handleSubmitStatus });
      return;
    }
    updateLeaveType({ body: data, id: activeId, handleSubmitStatus });
  };

  const editHandler = (id) => {
    const leaveType = leaveTypes?.find((item) => item._id === id);

    setDefaultValues({
      leaveTypes: leaveType?.name,
    });

    setIsUpdate(true);
    setActiveId(id);
  };

  const onDeleteSubmit = () => {
    deleteLeaveType({ id: activeId, handleSubmitStatus });
  };

  const columns = [
    { field: "name", headerName: "LeaveType Name", width: 130 },
    {
      field: "createdAt",
      headerName: "Date",
      type: "number",
      width: 200,
    },
  ];
  const formData = [
    {
      name: "leaveTypes",
      variant: "outlined",
      size: "small",
      inputType: "text",
      grid: { xs: 12 },
      fullWidth: true,
      label: "Name",
      isVisible: true,
    },
  ];
  //handle modal
  const deleteHandler = (id) => {
    setOpenDeleteModal(true);
    setActiveId(id);
  };

  return (
    <Box>
      <AppHeader title="Leave Type" />
      <Stack direction="row" marginTop={3} spacing={3}>
        <Box width="40%" display={{ xs: "none", sm: "none", md: "block" }}>
          <Paper sx={{ paddingY: 7, paddingX: 3 }}>
            <Stack spacing={4}>
              <Typography variant="h6">
                {activeId && isUpdate ? "Update" : "New"} Leave Type
              </Typography>
              <FormComponent
                data={formData}
                onSubmit={submitHandler}
                schema={schema}
                isSuccess={createLeaveTypesSuccess || updateLeaveTypesSuccess}
                defaultValues={defaultValues}
              >
                <LoadingButton
                  loading={createLeaveTypeLoading || updateLeaveTypeLoading}
                  loadingPosition="end"
                  variant="contained"
                  disableRipple
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 3.5 }}
                >
                  {activeId && isUpdate ? "Update" : "New"} LeaveType
                </LoadingButton>
                <Button
                  variant="contained"
                  disableRipple
                  color="secondary"
                  fullWidth
                  sx={{ marginTop: 3.5 }}
                  onClick={handleSubmitStatus}
                >
                  Reset
                </Button>
              </FormComponent>
            </Stack>
          </Paper>
        </Box>

        <Box flexGrow={4} width="100%">
          <Paper sx={{ width: "100%" }}>
            <DataTable
              columns={columns}
              rows={leaveTypes || []}
              pageSize={6}
              handleSelection={() => {}}
              key="id"
              hasAction={true}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              loading={isLoading}
            />
          </Paper>
        </Box>
      </Stack>
      <DeleteConfirmation
        open={openDeleteModal}
        loading={deleteLeaveTypeLoading}
        onSubmit={onDeleteSubmit}
        handleClose={() => setOpenDeleteModal(false)}
        title="Do you want to delete this Leave Types?"
        description="If you delete this leave types once, you can't restore it again"
      />
    </Box>
  );
};

export default LeaveType;

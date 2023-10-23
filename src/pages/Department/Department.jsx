import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";
import FormDialog from "../../components/modal/FormDialogue";

import FormComponent from "../../components/Form/Form";
import {
  useDepartmentCreateMutation,
  useDepartmentUpdateMutation,
  useGetDepartmentsQuery,
  useDepartmentDeleteMutation,
} from "../../redux/services/department.service";
import useAuth from "../../hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { departmentFormData } from "./Department-Form";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import UnAuthorized from "../../components/security/unAuthorized";

const Department = () => {
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [activeId, setActiveId] = useState("");
  //edit state
  const defaultFormState = {
    name: "",
    alias: "",
  };

  const [defaultValues, setDefaultValues] = useState(defaultFormState);

  const [modalFormDefaultValue, setModalFormDefaultValue] =
    useState(defaultFormState);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const { user } = useAuth();

  const { data: departments, isLoading } = useGetDepartmentsQuery(user?.admin, {
    skip: !user,
  });
  const [departmentCreate, { isLoading: createDepartmentLoading }] =
    useDepartmentCreateMutation();

  const [updateDepartment, { isLoading: updateDepartmentLoading }] =
    useDepartmentUpdateMutation();

  const [deleteDepartment, { isLoading: deleteDepartmentLoading }] =
    useDepartmentDeleteMutation();

  const handleSubmitStatus = () => {
    setDefaultValues(defaultFormState);
    setOpen(false);
    setActiveId("");
    setIsUpdate(false);
    setOpenDeleteModal(false);
    setModalFormDefaultValue(defaultFormState);
  };
  const submitHandler = (data) => {
    data.admin = user.admin;

    if (!isUpdate) {
      departmentCreate({ body: data, handleSubmitStatus });
      return;
    }
    updateDepartment({ body: data, id: activeId, handleSubmitStatus });
  };

  const editHandler = (id) => {
    setOpen(true);
    setIsUpdate(true);
    setActiveId(id);

    const department = departments?.find((item) => item._id === id);
    setModalFormDefaultValue({
      name: department?.name,
      alias: department?.alias,
    });
  };

  const deleteHandler = (id) => {
    setOpenDeleteModal(true);
    setActiveId(id);
  };

  const onDeleteSubmit = () => {
    deleteDepartment({ id: activeId, handleSubmitStatus });
  };

  const { formData, schema } = departmentFormData();

  const columns = [
    { field: "name", headerName: "Department Name", width: 130 },
    { field: "alias", headerName: "Alias Name", width: 130 },
    {
      field: "createdAt",
      headerName: "Date",
      type: "number",
      width: 200,
    },
  ];

  if (user?.role === "EMPLOYEE" || user?.role === "HOD") {
    return (
      <UnAuthorized
        title="Forbidden"
        description="You are not permitted to access this page"
      />
    );
  }

  return (
    <Box>
      <AppHeader title="Department">
        <Button
          sx={{ display: { md: "none" } }}
          variant="contained"
          color="error"
          endIcon={<AddIcon />}
          onClick={handleModal}
        >
          create
        </Button>
      </AppHeader>
      <Stack direction="row" marginTop={3} spacing={3}>
        <Box width="40%" display={{ xs: "none", sm: "none", md: "block" }}>
          <Paper sx={{ paddingY: 7, paddingX: 3 }}>
            <Stack spacing={4}>
              <Typography variant="h6">New Department</Typography>
              <FormComponent
                data={formData}
                onSubmit={submitHandler}
                schema={schema}
                defaultValues={defaultValues}
              >
                <LoadingButton
                  loading={createDepartmentLoading}
                  loadingPosition="end"
                  variant="contained"
                  disableRipple
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 3.5 }}
                >
                  Create Department
                </LoadingButton>
              </FormComponent>
            </Stack>
          </Paper>
        </Box>

        <Box flexGrow={4} width="100%">
          <Paper sx={{ width: "100%" }}>
            <DataTable
              columns={columns}
              rows={departments || []}
              pageSize={6}
              handleSelection={() => {}}
              key="_id"
              hasAction={true}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              loading={isLoading}
            />
          </Paper>
        </Box>
      </Stack>
      <FormDialog
        open={open}
        handleClose={handleModal}
        modalHeader={!isUpdate ? "Create Department" : "Update Department"}
        onSubmit={submitHandler}
        data={formData}
        schema={schema}
        loading={updateDepartmentLoading || createDepartmentLoading}
        defaultValues={modalFormDefaultValue}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        loading={deleteDepartmentLoading}
        onSubmit={onDeleteSubmit}
        handleClose={() => setOpenDeleteModal(false)}
        title="Do you want to delete this department"
        description="If you delete the department once, you can't restore it again"
      />
    </Box>
  );
};

export default Department;

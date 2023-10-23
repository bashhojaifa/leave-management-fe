import React, { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";
import FormDialog from "../../components/modal/FormDialogue";
import {
  useHodUpdateMutation,
  useGetHodsQuery,
  useHodDeleteMutation,
} from "../../redux/services/hod.service";
import { useGetDepartmentsQuery } from "../../redux/services/department.service";
import useAuth from "../../hooks/useAuth";
import hodFormData from "./Hod-Form";
import { toISO } from "../../utils/dateFormatter";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";

const Hod = () => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [defaultValues, setDefaultValues] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { user } = useAuth();
  const { data: hods, isLoading } = useGetHodsQuery(user?.admin, {
    skip: !user,
  });

  const { data: department } = useGetDepartmentsQuery(user?.admin, {
    skip: !user,
  });

  const [updateHod, { isLoading: updateHodLoading }] = useHodUpdateMutation();

  const [deleteHod, { isLoading: deleteHodLoading }] = useHodDeleteMutation();

  //edit state

  const submitHandler = async (data) => {
    const body = {
      ...data,
      dob: toISO(data.dob),
      joiningDate: toISO(data.joiningDate),
    };
    updateHod({ body: body, id: activeId, setOpen });
  };

  const editHandler = (id) => {
    setOpen(true);
    setActiveId(id);

    //set default values
    const hod = hods?.find((hod) => hod._id === id);

    setDefaultValues({
      firstName: hod.firstName,
      lastName: hod.lastName,
      mobile: hod.user.mobile,
      email: hod.user.email,
      gender: hod.gender,
      department: hod.department,
      dob: hod.dob,
      joiningDate: hod.joiningDate,
      address: hod.address,
      admin: hod.admin, //only set for update submit,
    });
  };

  const onDeleteSubmit = () => {
    deleteHod({ id: activeId, setOpenDeleteModal });
  };

  //handle modal
  const handleModal = () => {
    setOpen(!open);
    setDefaultValues({});
  };

  const handleDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setActiveId(id);
  };

  //columns and forms
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      valueGetter: (params) => params.row.firstName + " " + params.row.lastName,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 130,
      valueGetter: (params) => params.row.user.mobile,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params.row.user.email,
    },
    { field: "gender", headerName: "Gender", width: 130 },
    {
      field: "department",
      headerName: "Department",
      width: 130,
      renderCell: ({ value }) => {
        if (department) {
          const departmentName = department.find((item) => item._id === value);
          return departmentName?.name;
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
    },
  ];

  const { formData, schema } = hodFormData(
    department,
    { xs: 12, sm: 6 },
    "small"
  );

  return (
    <Box>
      <AppHeader title="Hod" />
      <Stack direction="row" marginTop={3} spacing={3}>
        <Paper sx={{ width: "100%" }}>
          <DataTable
            columns={columns}
            rows={hods || []}
            pageSize={6}
            handleSelection={() => {}}
            key="_id"
            hasAction={true}
            deleteHandler={handleDeleteModal}
            editHandler={editHandler}
            loading={isLoading}
          />
        </Paper>
      </Stack>
      <FormDialog
        open={open}
        handleClose={handleModal}
        modalHeader="Update Hod"
        onSubmit={submitHandler}
        data={formData}
        schema={schema}
        loading={updateHodLoading}
        defaultValues={defaultValues}
        spacing={{ xs: 2, md: 4 }}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        loading={deleteHodLoading}
        onSubmit={onDeleteSubmit}
        handleClose={() => setOpenDeleteModal(false)}
        title="Do you want to delete this HOD?"
        description="If you delete the hod once, you can't restore it again"
      />
    </Box>
  );
};

export default Hod;

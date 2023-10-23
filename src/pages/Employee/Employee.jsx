import React, { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";
import FormDialog from "../../components/modal/FormDialogue";
import {
  useEmployeeUpdateMutation,
  useGetEmployeesQuery,
  useEmployeeDeleteMutation,
} from "../../redux/services/employee.service";
import { useGetDepartmentsQuery } from "../../redux/services/department.service";
import useAuth from "../../hooks/useAuth";
import employeeFormData from "./Employee-Form";
import { toISO } from "../../utils/dateFormatter";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";

const Employee = () => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [defaultValues, setDefaultValues] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { user } = useAuth();
  const { data: employees, isLoading } = useGetEmployeesQuery(user?.admin, {
    skip: !user,
  });

  const { data: department } = useGetDepartmentsQuery(user?.admin, {
    skip: !user,
  });

  const [updateEmployee, { isLoading: updateEmployeeLoading }] =
    useEmployeeUpdateMutation();

  const [deleteEmployee, { isLoading: deleteEmployeeLoading }] =
    useEmployeeDeleteMutation();

  //edit state

  const submitHandler = async (data) => {
    const body = {
      ...data,
      dob: toISO(data.dob),
      joiningDate: toISO(data.joiningDate),
    };
    updateEmployee({ body: body, id: activeId, setOpen });
  };

  const editHandler = (id) => {
    setOpen(true);
    setActiveId(id);

    //set default values
    const employee = employees?.find((employee) => employee._id === id);

    setDefaultValues({
      firstName: employee.firstName,
      lastName: employee.lastName,
      mobile: employee.user.mobile,
      email: employee.user.email,
      gender: employee.gender,
      department: employee.department,
      dob: employee.dob,
      joiningDate: employee.joiningDate,
      address: employee.address,
    });
  };

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
      valueGetter: (params) => params.row.user?.mobile,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      valueGetter: (params) => params.row.user?.email,
    },
    { field: "gender", headerName: "Gender", width: 130 },
    {
      field: "department",
      headerName: "Department",
      width: 130,
      renderCell: ({ value }) => {
        if (department) {
          const departmentName = department.find((item) => item._id === value);
          return departmentName.name;
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
    },
  ];

  const { formData, schema } = employeeFormData(
    department,
    user?.role,
    { xs: 12, sm: 6 },
    "small"
  );
  const onDeleteSubmit = () => {
    deleteEmployee({ id: activeId, setOpenDeleteModal });
  };

  //handle modal
  const handleModal = () => {
    setOpen(!open);
    setDefaultValues({});
    setActiveId("");
  };

  const deleteHandler = (id) => {
    setOpenDeleteModal(true);
    setActiveId(id);
  };

  return (
    <Box>
      <AppHeader title="Employee" />
      <Stack direction="row" marginTop={3} spacing={3}>
        <Paper sx={{ width: "100%" }}>
          <DataTable
            columns={columns}
            rows={employees || []}
            pageSize={6}
            handleSelection={() => {}}
            key="_id"
            hasAction={true}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            loading={isLoading}
          />
        </Paper>
      </Stack>
      <FormDialog
        open={open}
        handleClose={handleModal}
        modalHeader="Update Employee"
        onSubmit={submitHandler}
        data={formData}
        schema={schema}
        loading={updateEmployeeLoading}
        defaultValues={defaultValues}
        spacing={{ xs: 2, md: 4 }}
      />
      <DeleteConfirmation
        open={openDeleteModal}
        loading={deleteEmployeeLoading}
        onSubmit={onDeleteSubmit}
        handleClose={() => setOpenDeleteModal(false)}
        title="Do you want to delete this Employee?"
        description="If you delete the employee once, you can't restore it again"
      />
    </Box>
  );
};

export default Employee;

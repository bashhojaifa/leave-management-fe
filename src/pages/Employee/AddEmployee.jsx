import React, { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import { LoadingButton } from "@mui/lab";

import FormComponent from "../../components/Form/Form";
import useAuth from "../../hooks/useAuth";
import { useGetDepartmentsQuery } from "../../redux/services/department.service";
import { toISO } from "../../utils/dateFormatter";
import { useEmployeeCreateMutation } from "../../redux/services/employee.service";
import SendIcon from "@mui/icons-material/Send";
import employeeFormData from "./Employee-Form";

const AddEmployee = () => {
  const { user } = useAuth();
  const defaultFormState = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    gender: "",
    department: "",
    dob: "",
    joiningDate: "",
    address: "",
  };

  //local state
  const [defaultValues, setDefaultValues] = useState(defaultFormState);

  const { data: department } = useGetDepartmentsQuery(user?.admin, {
    skip: !user,
  });

  const [employeeCreate, { isLoading, isSuccess }] =
    useEmployeeCreateMutation();

  const handleSubmitStatus = () => {
    setDefaultValues(defaultFormState);
  };

  const submitHandler = (data) => {
    const formData = {
      ...data,
      admin: user.admin,
      dob: toISO(data.dob),
      joiningDate: toISO(data.joiningDate),
    };
    employeeCreate({ body: formData, handleSubmitStatus });
  };

  const { formData, schema } = employeeFormData(
    department,
    user?.role,
    { xs: 12, sm: 6 },
    "medium"
  );

  return (
    <Box>
      <AppHeader title="Add Employee" />

      <Paper sx={{ paddingY: 7, paddingX: 3, marginTop: 3 }}>
        <Stack spacing={5} paddingX={10}>
          <Typography variant="h6">Create Employee</Typography>
          <FormComponent
            data={formData}
            onSubmit={submitHandler}
            schema={schema}
            isSuccess={isSuccess}
            defaultValues={defaultValues}
          >
            <Stack>
              <LoadingButton
                endIcon={<SendIcon />}
                loadingPosition="end"
                loading={isLoading}
                variant="contained"
                disableRipple
                color="primary"
                type="submit"
                sx={{ marginLeft: "auto" }}
              >
                Create Employee
              </LoadingButton>
            </Stack>
          </FormComponent>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddEmployee;

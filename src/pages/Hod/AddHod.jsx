import React, { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import { LoadingButton } from "@mui/lab";

import FormComponent from "../../components/Form/Form";
import useAuth from "../../hooks/useAuth";
import { useGetDepartmentsQuery } from "../../redux/services/department.service";
import { toISO } from "../../utils/dateFormatter";
import { useHodCreateMutation } from "../../redux/services/hod.service";
import SendIcon from "@mui/icons-material/Send";
import hodFormData from "./Hod-Form";

const AddHod = () => {
  const formDefaultState = {
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
  const [defaultValues, setDefaultValues] = useState(formDefaultState);

  const { user } = useAuth();

  const { data: department } = useGetDepartmentsQuery(user?.admin, {
    skip: !user,
  });

  const [hodCreate, { isLoading, isSuccess }] = useHodCreateMutation();

  const handleSubmitStatus = () => {
    setDefaultValues(formDefaultState);
  };

  const submitHandler = (data) => {
    const formData = {
      ...data,
      admin: user.admin,
      dob: toISO(data.dob),
      joiningDate: toISO(data.joiningDate),
    };
    hodCreate({ body: formData, handleSubmitStatus });
  };

  const { formData, schema } = hodFormData(
    department,
    { xs: 12, sm: 6 },
    "medium"
  );

  return (
    <Box>
      <AppHeader title="Add Hod" />

      <Paper sx={{ paddingY: 7, paddingX: 3, marginTop: 3 }}>
        <Stack spacing={5} paddingX={10}>
          <Typography variant="h6">Create Hod</Typography>
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
                Create Hod
              </LoadingButton>
            </Stack>
          </FormComponent>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AddHod;

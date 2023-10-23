/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";

import FormComponent from "../../components/Form/Form";
import useAuth from "../../hooks/useAuth";
import SendIcon from "@mui/icons-material/Send";
import { useGetLeaveTypesQuery } from "../../redux/services/leave-type.service";
import {
  useGetLeavesQuery,
  useLeaveCreateMutation,
  useLeaveUpdateMutation,
} from "../../redux/services/leave.service";
import leaveFormData from "./Leave-Form";
import { useGetEmployeesQuery } from "../../redux/services/employee.service";
import { useGetHodsQuery } from "../../redux/services/hod.service";
import { useSearchParams } from "react-router-dom";
import UnAuthorized from "../../components/security/unAuthorized";

const makeDefaultObject = (defaultData, leave) => {
  console.log(leave);
  return {
    firstName: defaultData?.firstName,
    lastName: defaultData?.lastName,
    availableLeaves: defaultData?.availableLeaves,
    leaveType: leave?.leaveType,
    startDate: dayjs(leave?.startDate).format("YYYY-MM-DD"),
    endDate: dayjs(leave?.endDate).format("YYYY-MM-DD"),
    hodStatus: leave?.hodStatus || "PENDING",
    adminStatus: leave?.adminStatus || "PENDING",
    note: leave?.note,
    hodRemark: leave?.hodRemark,
    adminRemark: leave?.adminRemark,
  };
};

const ApplyLeave = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const leaveId = searchParams.get("leaveid");

  //redux hooks
  const { data: leave } = useGetLeavesQuery(
    { id: user?.admin },
    {
      skip: !user,
      selectFromResult: ({ data }) => {
        const findLeave = data?.find((item) => item._id === leaveId);
        return { data: findLeave };
      },
    }
  );

  const { data: leaveTypes } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const { data: employees } = useGetEmployeesQuery(user?.admin, {
    skip: !user,
  });

  const { data: hods } = useGetHodsQuery(user?.admin, {
    skip: !user,
  });

  const [
    leaveCreate,
    { isLoading: applyLeaveLoading, isSuccess: applyLeaveSuccess },
  ] = useLeaveCreateMutation();

  const [
    leaveUpdate,
    { isLoading: updateLeaveLoading, isSuccess: updateLeaveSuccess },
  ] = useLeaveUpdateMutation();

  //local states

  const [defaultValues, setDefaultValues] = useState({
    firstName: "",
    lastName: "",
    availableLeaves: "",
    note: "",
    adminRemark: "",
    hodRemark: "",
  });

  const [isSelfLeave, setSelfLeave] = useState(false);

  const submitHandler = (data) => {
    data.admin = user?.admin;
    data.user = user?._id;
    if (user.role === "EMPLOYEE") {
      const employee = employees.find(
        (employee) => employee.user._id === user?._id
      );
      const numOfDay = dayjs(data.endDate).diff(dayjs(data.startDate), "day");
      leaveCreate({
        ...data,
        startDate: data.startDate.toISOString(),
        employee: employee?._id,
        numOfDay,
        department: employee.department,
      });
    }
    if (user.role === "HOD") {
      const hod = hods.find((hod) => hod.user._id === user?._id);
      const numOfDay = dayjs(data.endDate).diff(dayjs(data.startDate), "day");
      leaveCreate({
        ...data,
        startDate: data.startDate.toISOString(),
        hod: hod?._id,
        numOfDay,
        department: hod.department,
        hodStatus: "APPROVED",
      });
    }
  };

  const updateLeave = (data) => {
    data = { ...leave, ...data };
    leaveUpdate({ id: data._id, body: data });
  };

  const { formData, schema } = leaveFormData(
    leaveTypes,
    user?.role,
    isSelfLeave,
    leave,
    { xs: 12, sm: 6 },
    "medium"
  );

  useEffect(() => {
    if (leave) {
      if (leave?.employee) {
        const employee = employees?.find(
          (employee) => employee._id === leave?.employee
        );
        if (employee) {
          const formattedValues = makeDefaultObject(employee, leave);
          setDefaultValues(formattedValues);
          if (employee.user?._id === user._id) {
            setSelfLeave(true);
          }
        }
        return;
      }

      if (leave?.hod) {
        const hod = hods?.find((hod) => hod._id === leave?.hod);
        if (hod) {
          const formattedValues = makeDefaultObject(hod, leave);
          setDefaultValues(formattedValues);
          if (hod.user._id === user._id) {
            setSelfLeave(true);
          }
        }
        return;
      }
    }
    setDefaultValues({
      firstName: user?.firstName,
      lastName: user?.lastName,
      availableLeaves: user?.availableLeaves,
    });
  }, [employees, hods, leave]);

  if (user?.role === "ADMIN" && !leaveId)
    return (
      <UnAuthorized
        title="Are you kidding"
        description="You are the admin you do not need apply for leave"
      />
    );

  return (
    <Box>
      <AppHeader title="Apply for Leave" />

      <Paper sx={{ paddingY: 7, paddingX: 3, marginTop: 3 }}>
        <Stack spacing={5} paddingX={{ xs: 3, sm: 6, md: 10, lg: 12, xl: 15 }}>
          <Typography variant="h6">Apply Leave</Typography>
          <FormComponent
            data={formData}
            onSubmit={leave ? updateLeave : submitHandler}
            schema={schema}
            isSuccess={applyLeaveSuccess || updateLeaveSuccess}
            defaultValues={defaultValues}
          >
            <Stack marginTop={2}>
              <LoadingButton
                endIcon={<SendIcon />}
                loadingPosition="end"
                loading={applyLeaveLoading || updateLeaveLoading}
                variant="contained"
                disableRipple
                color="primary"
                type="submit"
                sx={{ marginLeft: "auto" }}
              >
                Submit Leave
              </LoadingButton>
            </Stack>
          </FormComponent>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ApplyLeave;

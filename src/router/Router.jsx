import React from "react";
import { Route, Routes } from "react-router-dom";
import Department from "../pages/Department/Department";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./Private.route";
import AddEmployee from "../pages/Employee/AddEmployee";
import Employee from "../pages/Employee/Employee";
import LeaveType from "../pages/Leave-Types/Leave-Types";
import PublicRoutes from "./Public.route";
import { Stack, Typography } from "@mui/material";
import SignIn from "../pages/Login/Login";
import AllLeaves from "../pages/Leaves/All-Leaves";
import PendingLeaves from "../pages/Leaves/Pending-Leaves";
import ApprovedLeaves from "../pages/Leaves/Approved-Leaves";
import RejectedLeaves from "../pages/Leaves/Rejected-Leaves";
import ApplyLeave from "../pages/Leaves/Apply-Leave";
import AddHod from "../pages/Hod/AddHod";
import Hod from "../pages/Hod/Hod";
import LeaveHistory from "../pages/Leaves/Leave-History";
import Profile from "../pages/Profile/Profile";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="department" element={<Department />} />
        <Route path="profile" element={<Profile />} />
        <Route path="employees">
          <Route path="add" element={<AddEmployee />} />
          <Route path="" element={<Employee />} />
        </Route>
        <Route path="hods">
          <Route path="add" element={<AddHod />} />
          <Route path="" element={<Hod />} />
        </Route>
        <Route path="leaves">
          <Route path="leave-types" element={<LeaveType />} />
          <Route path="" element={<AllLeaves />} />
          <Route path="pending" element={<PendingLeaves />} />
          <Route path="approved" element={<ApprovedLeaves />} />
          <Route path="apply" element={<ApplyLeave />} />
          <Route path="rejected" element={<RejectedLeaves />} />
          <Route path="history" element={<LeaveHistory />} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/auth/login" element={<SignIn />} />
      </Route>
      <Route
        path="*"
        element={
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h1">404 - Not Found</Typography>
          </Stack>
        }
      ></Route>
    </Routes>
  );
};
export default Router;

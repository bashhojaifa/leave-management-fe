import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import AppHeader from "../../components/app-header/AppHeader";
import HeadsOfDepartment from "./HODList";
import Welcome from "./Welcome";
import { useGetLeavesQuery } from "../../redux/services/leave.service";
import useAuth from "../../hooks/useAuth";
import LeaveHistoryCard from "../../components/pages-component/LeaveHistoryGrid";
import EmployeeList from "./EmployeeList";
import Leave from "../Leaves/Leaves";

const Dashboard = () => {
  // const [selected, setSelected] = useState([]);

  // const handleSelection = (data) => {
  //   setSelected(data);
  // };

  //auth hook
  const { user } = useAuth();

  //rkt hooks
  const { countData } = useGetLeavesQuery(
    { id: user?.admin },
    {
      skip: !user,
      selectFromResult: ({ data }) => {
        const countData = {
          all: data?.length,
          pending: 0,
          approved: 0,
          rejected: 0,
        };

        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.adminStatus === "PENDING") countData.pending++;
            if (item.adminStatus === "APPROVED") countData.approved++;
            if (item.adminStatus === "REJECTED") countData.rejected++;
          });
        }

        return { leaves: data, countData };
      },
    }
  );

  return (
    <Box component={Stack} spacing={2}>
      <AppHeader title="Dashboard" />
      <Welcome />

      <Box>
        <Typography variant="h4" color="text.secondary">
          Data Information
        </Typography>
        <Grid container spacing={2} alignItems="center" marginTop={1}>
          {/* I have only 4 card, that's why i don't use loop */}
          <LeaveHistoryCard
            count={countData.all}
            description="All Leave Applied"
            customColor="warning"
            icon={<ForwardToInboxIcon sx={{ fontSize: 100 }} />}
          />
          <LeaveHistoryCard
            count={countData.pending}
            description="Pending"
            customColor="primary"
            icon={<QueryBuilderIcon sx={{ fontSize: 100 }} />}
          />
          <LeaveHistoryCard
            description="Approved"
            customColor="success"
            count={countData.approved}
            icon={<DoneIcon sx={{ fontSize: 100 }} />}
          />
          <LeaveHistoryCard
            description="Rejected"
            customColor="error"
            count={countData.rejected}
            icon={<ClearIcon sx={{ fontSize: 100 }} />}
          />
        </Grid>
      </Box>
      {user?.role === "ADMIN" && (
        <Grid container rowSpacing={2} columnSpacing={{ md: 1 }} paddingTop={2}>
          <Grid item xs={12} sm={6} md={4}>
            <HeadsOfDepartment />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <EmployeeList />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <HeadsOfDepartment />
          </Grid>
          <Grid item xs={12} sm={6} md={8}></Grid>
        </Grid>
      )}
      <Box>
        <Typography variant="h4" color="text.secondary">
          Latest Leave Applications
        </Typography>
        <Leave filterTerms="PENDING" showHeader={false} sort="ascending" />
      </Box>
    </Box>
  );
};

export default Dashboard;

import React from "react";
import Leave from "./Leaves";
import { Box } from "@mui/material";

import Grid from "@mui/material/Grid";

import DoneIcon from "@mui/icons-material/Done";
import { useGetLeavesQuery } from "../../redux/services/leave.service";
import useAuth from "../../hooks/useAuth";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import ClearIcon from "@mui/icons-material/Clear";
import LeaveHistoryCard from "../../components/pages-component/LeaveHistoryGrid";

function LeaveHistory() {
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
    <Box>
      <Grid
        container
        spacing={2}
        // justifyContent="center"
        marginBottom={3}
        alignItems="center"
      >
        {/* I have only 4 card, that's why i don't use loop */}
        <LeaveHistoryCard
          count={countData.all}
          description="All Leave Applied"
          customColor="warning"
          icon={<ForwardToInboxIcon sx={{ fontSize: 75 }} />}
        />
        <LeaveHistoryCard
          count={countData.pending}
          description="Pending"
          customColor="primary"
          icon={<QueryBuilderIcon sx={{ fontSize: 75 }} />}
        />
        <LeaveHistoryCard
          description="Approved"
          customColor="success"
          count={countData.approved}
          icon={<DoneIcon sx={{ fontSize: 75 }} />}
        />
        <LeaveHistoryCard
          description="Rejected"
          customColor="error"
          count={countData.rejected}
          icon={<ClearIcon sx={{ fontSize: 75 }} />}
        />
      </Grid>
      <Leave filterTerms="all" />
    </Box>
  );
}

export default LeaveHistory;

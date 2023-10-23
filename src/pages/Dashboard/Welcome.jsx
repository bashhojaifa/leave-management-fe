import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import useAuth from "../../hooks/useAuth";

function Welcome() {
  const { user } = useAuth();
  return (
    <Paper
      component={Stack}
      padding={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={3}
    >
      <Box component="div">
        <Avatar sx={{ width: 70, height: 70, backgroundColor: "primary.main" }}>
          {user?.firstName?.toUpperCase()[0]}
        </Avatar>
      </Box>
      <Box>
        <Typography variant="h5" color="text.secondary">
          Welcome, Back
        </Typography>
        <Typography variant="h6">
          {user?.firstName} {user?.lastName}
          <Typography variant="strong" component="strong" color="GrayText">
            &nbsp; ({user?.role})
          </Typography>
        </Typography>
      </Box>
    </Paper>
  );
}

export default Welcome;

import { Stack, Typography } from "@mui/material";
import React from "react";

function UnAuthorized({ title, description }) {
  return (
    <Stack alignItems="center" minHeight="70vh">
      <Typography variant="h3">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Stack>
  );
}

export default UnAuthorized;

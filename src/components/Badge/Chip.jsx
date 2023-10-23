import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Chip } from "@mui/material";

function ChipComponent({ status, label }) {
  const variants = {
    PENDING: {
      color: "warning",
      icon: <AccessTimeIcon />,
    },
    APPROVED: {
      color: "success",
      icon: <DoneIcon />,
    },
    REJECTED: {
      color: "error",
      icon: <CancelPresentationIcon />,
    },
  };

  return (
    <Chip
      label={label}
      component="div"
      variant="outlined"
      deleteIcon={variants[status]?.icon}
      color={variants[status]?.color}
    />
  );
}

export default ChipComponent;

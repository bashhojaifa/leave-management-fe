import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function Test() {
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("I am from use Effect");
  }, []);

  return <div>{console.log("I am from jsx")}</div>;
}

export default Test;

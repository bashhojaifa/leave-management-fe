import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteForever } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function DeleteConfirmation(props) {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ paddingBottom: 2 }}>
        <Button variant="text" onClick={handleClose}>
          Disagree
        </Button>
        <LoadingButton
          loading={props.loading}
          loadingPosition="end"
          endIcon={<DeleteForever />}
          variant="text"
          disableRipple
          color="error"
          onClick={props.onSubmit}
        >
          Agree
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

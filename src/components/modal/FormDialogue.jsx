/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Form/Input";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

export default function FormDialog({
  handleClose,
  open,
  modalHeader,
  modalDescription,
  style,
  onSubmit,
  schema,
  data,
  loading,
  spacing,
  ...props
}) {
  const [defaultValues, setDefaultValues] = React.useState(props.defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  React.useEffect(() => {
    setDefaultValues(props.defaultValues);
    reset(props.defaultValues);
  }, [props.defaultValues]);

  return (
    <Dialog
      {...props}
      PaperComponent={Paper}
      open={open}
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogTitle>{modalHeader}</DialogTitle>
      <Box
        style={{ width: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <DialogContent>
          <DialogContentText>{modalDescription}</DialogContentText>
          <Grid container spacing={spacing ? spacing : 2}>
            {data.map(
              (item, index) =>
                item.isVisible && (
                  <Grid item {...item.grid} key={item.name}>
                    <Input
                      errors={errors}
                      name={item.name}
                      register={register}
                      variant={item.variant}
                      size={item.size}
                      inputType={item.inputType}
                      fullWidth={item.fullWidth}
                      label={item.label}
                      control={control}
                      options={item.options}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ paddingY: 2, paddingX: 2 }}>
          <Button
            variant="contained"
            color="warning"
            disableElevation
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <LoadingButton
            loading={loading}
            loadingPosition="end"
            endIcon={<SaveIcon />}
            variant="contained"
            disableRipple
            color="info"
            type="submit"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

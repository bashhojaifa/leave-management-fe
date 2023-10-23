/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import Input from "./Input";

export default function FormComponent({
  schema,
  onSubmit,
  data,
  children,
  defaultValues: defaultValuesProp,
}) {
  const [defaultValues, setDefaultValues] = React.useState(defaultValuesProp);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  React.useEffect(() => {
    reset(defaultValuesProp);
    setDefaultValues(defaultValuesProp);

    // return () => {
    //   setDefaultValues({});
    // };
  }, [defaultValuesProp]);

  return (
    <Box
      component="form"
      flexGrow={2}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Grid container spacing={2}>
        {data.map(
          (item) =>
            item.isVisible && (
              <Grid key={item.name} item {...item.grid}>
                <Input
                  {...item}
                  label={item.label}
                  fullWidth={item.fullWidth}
                  key={item.name}
                  errors={errors}
                  name={item.name}
                  register={register}
                  variant={item.variant}
                  size={item.size}
                  inputType={item.inputType}
                  control={control}
                  options={item.options}
                />
              </Grid>
            )
        )}
      </Grid>
      {children}
    </Box>
  );
}

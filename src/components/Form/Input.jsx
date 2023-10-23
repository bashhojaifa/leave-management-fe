import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

function Input({
  register,
  errors,
  name,
  inputType,
  variant,
  fullWidth,
  label,
  size,
  control,
  options, //when input type select must have a options props
  ...rest
}) {
  const commonType = ["text", "number", "password", "textarea"];
  return (
    <>
      {commonType.includes(inputType) && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <TextField
              value={field.value}
              inputRef={field.ref}
              label={label}
              variant={variant}
              onChange={(e) => field.onChange(e.target.value)}
              type={inputType}
              error={Boolean(errors[name])}
              helperText={errors[name]?.message}
              fullWidth={fullWidth}
              multiline={inputType === "textarea"}
              minRows={inputType === "textarea" ? rest.minRows : 1}
              size={size}
              {...rest}
            />
          )}
        />
      )}
      {inputType === "date" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DatePicker
              value={dayjs(field.value)}
              inputRef={field.ref}
              onChange={(date) => field.onChange(date)}
              format="DD-MMM-YYYY"
              slotProps={{
                textField: {
                  ...rest,
                  fullWidth: fullWidth,
                  error: Boolean(errors[name]),
                  helperText: errors[name]?.message,
                  size: size,
                },
              }}
              label={label}
            />
          )}
        />
      )}
      {inputType === "select" && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Autocomplete
              options={options}
              onChange={(_event, data) => field.onChange(data?.value)}
              value={
                options.find((item) => item.value === field?.value) || null
              }
              disabled={rest.disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...rest}
                  inputMode={field.ref}
                  label={label}
                  error={Boolean(errors[name])}
                  helperText={errors[name]?.message}
                  fullWidth={fullWidth}
                  size={size}
                />
              )}
            />
          )}
        />
      )}
    </>
  );
}

export default Input;

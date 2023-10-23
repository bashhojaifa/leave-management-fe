import * as yup from "yup";

export const departmentFormData = () => {
  const schema = yup
    .object({
      alias: yup.string().required(),
      name: yup.string().required(),
    })
    .required();

  const formData = [
    {
      name: "name",
      variant: "outlined",
      size: "small",
      inputType: "text",
      grid: { xs: 12 },
      fullWidth: true,
      label: "Department Name",
      isVisible: true,
    },
    {
      name: "alias",
      variant: "outlined",
      size: "small",
      inputType: "text",
      grid: { xs: 12 },
      fullWidth: true,
      label: "Alias name",
      isVisible: true,
    },
  ];

  return { schema, formData };
};

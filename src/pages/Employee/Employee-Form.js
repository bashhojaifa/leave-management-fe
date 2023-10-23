import * as yup from "yup";

const employeeFormData = (department, role, gridSize, inputSize) => {
  const schema = yup
    .object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      gender: yup.string().required("Select a gender"),
      department: yup.string().required("Select a department"),
      dob: yup.date().required("Select date of birth"),
      joiningDate: yup.date().required("Select joining date"),
      address: yup.string().required("Address is required"),
      mobile: yup.string().required("Mobile number is required"),
      email: yup.string().email("Invalid Email").required("Email is required"),
    })
    .required();

  const formData = [
    {
      name: "firstName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "First name",
      isVisible: true,
    },
    {
      name: "lastName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Last name",
      isVisible: true,
    },
    {
      name: "mobile",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Enter mobile",
      isVisible: true,
    },
    {
      name: "email",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Enter Email",
      isVisible: true,
    },
    {
      name: "gender",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "Select Gender",
      isVisible: true,
      options: [
        {
          label: "Male",
          value: "MALE",
        },
        {
          label: "Female",
          value: "FEMALE",
        },
        {
          label: "Other",
          value: "OTHER",
        },
      ],
    },
    {
      name: "department",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "Select department",
      disabled: role === "HOD",
      isVisible: true,
      options: department
        ? department.map((item) => ({ label: item.name, value: item._id }))
        : [],
    },
    {
      name: "dob",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      label: "Date of birth",
      isVisible: true,
    },
    {
      name: "joiningDate",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      label: "Joining date",
      isVisible: true,
    },
    {
      name: "address",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "address",
      isVisible: true,
    },
  ];
  return { schema, formData };
};

export default employeeFormData;

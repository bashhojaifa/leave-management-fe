import dayjs from "dayjs";
import * as yup from "yup";

const leaveFormData = (
  leaveTypes,
  role,
  isSelf,
  leave,
  gridSize,
  inputSize
) => {
  const schema = yup
    .object({
      leaveType: yup.string().required("Please select a leave type"),
      startDate: yup.date().required("Select leave start date"),
      endDate: yup.date().required("Select leave end date"),
      adminRemark: yup.string(),
      hodRemark: yup.string(),
      hodStatus: yup.string(),
      adminStatus: yup.string(),
      availableLeaves: yup.number().required("Your leave is empty"),
      firstName: yup.string().required("Employee name is empty"),
      lastName: yup.string().required("Employee name is empty"),
      note: yup.string().required("Select leave end date"),
    })
    .required();

  const isDisabled = (role, leave) => {
    if (!leave) return false;

    //check if leave is expired then disable
    if (leave) {
      const startDate = dayjs(leave?.startDate);
      const currentDate = dayjs();

      const diff = startDate.diff(currentDate, "day");
      if (diff < 0) return true;
    }

    if (role === "HOD") {
      if (leave && !isSelf) return true;
      if (leave.adminStatus !== "PENDING") return true;
    }

    if (role === "EMPLOYEE") {
      if (leave && leave.hodStatus !== "PENDING") return true;
    }

    if (role === "ADMIN") {
      return true;
    }

    return false;
  };

  const formData = [
    {
      name: "firstName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "First Name",
      disabled: true,
      isVisible: true,
    },
    {
      name: "lastName",
      variant: "outlined",
      size: inputSize,
      inputType: "text",
      grid: gridSize,
      fullWidth: true,
      label: "Last Name",
      disabled: true,
      isVisible: true,
    },

    {
      name: "leaveType",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: { xs: 12 },
      fullWidth: true,
      label: "Select leave type",
      isVisible: true,
      disabled: isDisabled(role, leave),
      options: leaveTypes
        ? leaveTypes.map((item) => ({ label: item.name, value: item._id }))
        : [],
    },
    {
      name: "availableLeaves",
      variant: "outlined",
      size: inputSize,
      inputType: "number",
      grid: gridSize,
      fullWidth: true,
      label: "Available Leaves",
      disabled: true,
      isVisible: true,
    },
    {
      name: "startDate",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      disabled: isDisabled(role, leave),
      label: "Start Date",
      isVisible: true,
    },
    {
      name: "endDate",
      variant: "outlined",
      size: inputSize,
      inputType: "date",
      grid: gridSize,
      fullWidth: true,
      disabled: isDisabled(role, leave),
      label: "End Date",
      isVisible: true,
    },
    {
      name: "hodStatus",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "HOD Status",
      isVisible: role === "HOD" && leave && !isSelf,
      disabled: role !== "HOD" || leave?.adminStatus !== "PENDING",
      options: [
        {
          label: "Pending",
          value: "PENDING",
        },
        {
          label: "Approved",
          value: "APPROVED",
        },
        {
          label: "Rejected",
          value: "REJECTED",
        },
      ],
    },
    {
      name: "adminStatus",
      variant: "outlined",
      size: inputSize,
      inputType: "select",
      grid: gridSize,
      fullWidth: true,
      label: "Admin Status",
      isVisible: role === "ADMIN",
      disabled: role !== "ADMIN",
      options: [
        {
          label: "Pending",
          value: "PENDING",
        },
        {
          label: "Approved",
          value: "APPROVED",
        },
        {
          label: "Rejected",
          value: "REJECTED",
        },
      ],
    },
    {
      name: "note",
      variant: "outlined",
      size: inputSize,
      inputType: "textarea",
      grid: gridSize,
      fullWidth: true,
      label: "Reason for leave",
      minRows: 4,
      disabled: isDisabled(role, leave),
      isVisible: true,
    },
    {
      name: "hodRemark",
      variant: "outlined",
      size: inputSize,
      inputType: "textarea",
      grid: gridSize,
      fullWidth: true,
      label: "HOD remark",
      minRows: 4,
      disabled: (role !== "HOD" && !isSelf) || leave?.adminStatus !== "PENDING",
      isVisible: !leave && role === "HOD" ? false : true,
    },
    {
      name: "adminRemark",
      variant: "outlined",
      size: inputSize,
      inputType: "textarea",
      grid: gridSize,
      fullWidth: true,
      label: "Admin Remark",
      minRows: 4,
      disabled: role !== "ADMIN",
      isVisible: true,
    },
  ];
  return { schema, formData };
};

export default leaveFormData;

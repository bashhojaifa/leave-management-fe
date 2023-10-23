import React, { useState } from "react";
import { Box, Paper, Stack, Tooltip } from "@mui/material";
import AppHeader from "../../components/app-header/AppHeader";
import DataTable from "../../components/table/Table";

import {
  useGetLeavesQuery,
  useLeaveDeleteMutation,
} from "../../redux/services/leave.service";

import { useGetLeaveTypesQuery } from "../../redux/services/leave-type.service";

import { useGetEmployeesQuery } from "../../redux/services/employee.service";

import useAuth from "../../hooks/useAuth";
import ChipComponent from "../../components/Badge/Chip";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteConfirmation from "../../components/modal/DeleteConfirmation";
import { useGetHodsQuery } from "../../redux/services/hod.service";

const Leave = ({ filterTerms, showHeader = true, sort = "descending" }) => {
  //auth hook
  const { user } = useAuth();

  //rkt hooks
  const { data: leaves, isLoading } = useGetLeavesQuery(
    { id: user?.admin, sort },
    {
      skip: !user,
      selectFromResult: ({ data, ...rest }) => {
        if (filterTerms === "all") return { data, ...rest };
        const getStatusKey =
          user?.role === "ADMIN" ? "adminStatus" : "hodStatus";
        const filteredData = data?.filter((item) => {
          if (user?.role === "EMPLOYEE") {
            return item["adminStatus"] === filterTerms;
          }
          return item[getStatusKey] === filterTerms;
        });
        return { data: filteredData, ...rest };
      },
    }
  );

  const { data: leaveTypes } = useGetLeaveTypesQuery(user?.admin, {
    skip: !user,
  });

  const { data: hods } = useGetHodsQuery(user?.admin, {
    skip: !user,
  });

  const [leaveDelete, { isLoading: leaveDeleteLoading }] =
    useLeaveDeleteMutation();

  const { data: employees } = useGetEmployeesQuery(user?.admin, {
    skip: !user,
  });

  //local state hooks
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [activeId, setActiveId] = useState("");

  const onOpenModal = (id) => () => {
    setActiveId(id);
    setDeleteModal(true);
  };

  const onDeleteSubmit = () => {
    leaveDelete({ id: activeId, setDeleteModal });
  };

  const columns = [
    {
      field: "employee",
      headerName: user?.role === "ADMIN" ? "Employee/HOD" : "Employee",
      width: 200,
      valueGetter: ({ value, row }) => {
        if (row.employee) {
          const employee = employees?.find(
            (employee) => employee._id === value
          );
          if (employee) {
            return `${employee?.firstName} ${employee?.lastName} ${
              user.role === "ADMIN" ? "(EMPLOYEE)" : ""
            }`;
          }
        }
        if (row.hod) {
          const hod = hods?.find((hod) => hod._id === row.hod);
          const isSelf = hod?.user._id === user._id;
          if (hod) {
            return `${hod?.firstName} ${hod?.lastName} ${
              isSelf ? "(Self)" : ""
            } ${user.role === "ADMIN" ? "(HOD)" : ""}`;
          }
        }
        return "";
      },
    },
    {
      field: "leaveType",
      headerName: "Leave Type",
      width: 150,
      valueGetter: ({ value }) => {
        const leaveType = leaveTypes?.find(
          (leaveType) => leaveType._id === value
        );
        return leaveType?.name;
      },
    },
    {
      field: "numOfDay",
      headerName: "Total Days",
      width: 100,
      valueGetter: ({ value }) => {
        return value + " Days";
      },
    },
    {
      field: "hodStatus",
      headerName: "Hod Status",
      width: 130,
      renderCell: ({ value }) => {
        return <ChipComponent label={value} status={value} />;
      },
    },
    {
      field: "adminStatus",
      headerName: "Admin Status",
      width: 130,
      renderCell: ({ value }) => {
        return <ChipComponent label={value} status={value} />;
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 150,
      valueGetter: ({ value }) => {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 150,
      valueGetter: ({ value }) => {
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      field: "_id",
      headerName: "Action",
      width: 100,
      renderCell: ({ value, row }) => (
        <Stack
          direction="row"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          <Link to={`/leaves/apply?leaveid=${value}`}>
            <Tooltip title="View" arrow>
              <VisibilityIcon sx={{ color: "primary.main" }} />
            </Tooltip>
          </Link>

          {row.hodStatus === "PENDING" &&
            row.adminStatus === "PENDING" &&
            row.user === user._id && (
              <Tooltip title="Delete" arrow>
                <DeleteForeverIcon
                  sx={{ cursor: "pointer" }}
                  onClick={onOpenModal(value)}
                />
              </Tooltip>
            )}
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      {showHeader && <AppHeader title="Leave" />}
      <Stack direction="row" marginTop={3} spacing={3}>
        <Paper sx={{ width: "100%", padding: 0 }}>
          <DataTable
            columns={columns}
            rows={leaves || []}
            pageSize={6}
            handleSelection={() => {}}
            key="_id"
            hasAction={false}
            loading={isLoading}
          />
        </Paper>
      </Stack>
      <DeleteConfirmation
        open={openDeleteModal}
        loading={leaveDeleteLoading}
        onSubmit={onDeleteSubmit}
        handleClose={() => setDeleteModal(false)}
        title="Do you want to delete this leave"
        description="If you delete the leave once, you can't restore it again"
      />
    </Box>
  );
};

export default Leave;

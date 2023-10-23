/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import CustomNoRowsOverlay from "./No-data";

export default function DataTable(props) {
  const [rows, setRows] = React.useState(props.rows);
  const [columns, setColumns] = React.useState(props.columns);
  const { pageSize, handleSelection, deleteHandler, editHandler, loading } =
    props;
  const handleEditClick = (id) => () => {
    editHandler(id);
  };

  const handleDeleteClick = (id) => () => {
    deleteHandler(id);
  };

  React.useMemo(() => {
    setRows(props.rows);
  }, [props.rows]);

  React.useMemo(() => {
    setColumns(props.columns);
  }, [props.columns]);

  React.useMemo(() => {
    if (props.hasAction) {
      const actionData = {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 100,
        cellClassName: "actions",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={
                <Tooltip title="Edit">
                  <EditIcon />
                </Tooltip>
              }
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,

            <GridActionsCellItem
              icon={
                <Tooltip title="Delete">
                  <DeleteIcon />
                </Tooltip>
              }
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      };
      setColumns([...props.columns, actionData]);
    }
  }, [rows, props.columns]);

  return (
    <Box sx={{ height: 500, width: "100%", padding: 0, margin: 0 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
            },
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          handleSelection(newRowSelectionModel);
        }}
        pageSizeOptions={[pageSize]}
        checkboxSelection
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
      />
    </Box>
  );
}

DataTable.defaultProps = {
  dependencies: [],
};

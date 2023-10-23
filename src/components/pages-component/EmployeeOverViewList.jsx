import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
// import { Link } from "react-router-dom";

function EmployeeOverviewList({ people, department }) {
  const firstName = people.firstName;
  const lastName = people.lastName;

  const avatarColor = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  const avatarColorIndex = Math.floor(Math.random() * avatarColor.length);

  return (
    <>
      <ListItem
        sx={{
          color: "text.primary",
        }}
        alignItems="flex-start"
        // component={Link}
        // to={`/profile/${people._id}`}
      >
        <ListItemAvatar>
          <Avatar
            sx={{ backgroundColor: avatarColor[avatarColorIndex] }}
            alt={firstName.toUpperCase()[0]}
          >
            {firstName.toUpperCase()[0]}
          </Avatar>
        </ListItemAvatar>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <ListItemText
            primary={`${firstName} ${lastName}`}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Department-
                </Typography>
                {department} <br />
                <Typography variant="strong">Mobile </Typography>
                {people?.user?.mobile}
              </React.Fragment>
            }
          />
        </Stack>
      </ListItem>
    </>
  );
}

EmployeeOverviewList.defaultProps = {
  people: {
    lastName: "",
    firstName: "",
    _id: "",
  },
  department: "",
};

export default EmployeeOverviewList;

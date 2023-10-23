import { Divider, List, Paper, Typography } from "@mui/material";
import { useGetDepartmentsQuery } from "../../redux/services/department.service";
import useAuth from "../../hooks/useAuth";
import HodList from "./EmployeeOverViewList";
import EmployeeOverViewsSkeleton from "../SkeletonLoader/EmployeeOvervies.Skeletron";

export default function EmployeeOverViews({ peoples = [], title, isLoading }) {
  const { user, isLoading: userLoading } = useAuth();

  const { data: departments, getDepartmentLoading } = useGetDepartmentsQuery(
    user?.admin,
    {
      skip: !user,
      selectFromResult: ({ data, isLoading }) => {
        if (Array.isArray(data)) {
          const convertToObj = data.reduce((acc, curr) => {
            acc[curr._id] = curr.name;
            return acc;
          }, {});
          return { data: convertToObj, getDepartmentLoading: isLoading };
        }
        return { data, getDepartmentLoading: isLoading };
      },
    }
  );
  return (
    <Paper
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        padding: 1,
      }}
    >
      <Typography variant="h5" component="h1" paddingX={2} paddingY={1}>
        {title}
      </Typography>
      <List sx={{ overflowY: "auto", minHeight: "15rem", maxHeight: "30rem" }}>
        {isLoading || getDepartmentLoading || userLoading ? (
          <>
            <EmployeeOverViewsSkeleton />
            <EmployeeOverViewsSkeleton />
            <EmployeeOverViewsSkeleton />
          </>
        ) : (
          peoples.map((people, index) => {
            const department = departments?.[people.department];
            return (
              <>
                <HodList
                  department={department}
                  people={people}
                  key={people._id}
                  isLoading={isLoading}
                />
                {index !== peoples.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </>
            );
          })
        )}
      </List>
    </Paper>
  );
}

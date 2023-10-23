import * as React from "react";
import useAuth from "../../hooks/useAuth";
import { useGetEmployeesQuery } from "../../redux/services/employee.service";
import EmployeeOverViews from "../../components/pages-component/EmployeeOverviews";

function EmployeeList() {
  const { user } = useAuth();

  const { data: employees } = useGetEmployeesQuery(user?.admin, {
    skip: !user,
  });

  return <EmployeeOverViews peoples={employees} title="List of Employees" />;
}
export default EmployeeList;

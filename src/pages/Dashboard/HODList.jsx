import * as React from "react";
import useAuth from "../../hooks/useAuth";
import { useGetHodsQuery } from "../../redux/services/hod.service";
import EmployeeOverViews from "../../components/pages-component/EmployeeOverviews";

export default function HeadsOfDepartmentList() {
  const { user } = useAuth();

  const { data: hods = [], isLoading } = useGetHodsQuery(user?.admin, {
    skip: !user,
  });

  return (
    <EmployeeOverViews
      peoples={hods}
      title="Heads of Department"
      isLoading={isLoading}
    />
  );
}

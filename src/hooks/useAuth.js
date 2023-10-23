import { useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/services/auth.service";

const useAuth = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const { data, isLoading } = useGetUserQuery(undefined, { skip: !token });
  return { token, user: data?.data, isLoading };
};

export default useAuth;

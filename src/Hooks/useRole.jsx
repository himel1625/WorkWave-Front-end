import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
const useRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/${user?.email}`);
      return data.role;
    },
  });
  return [role, isLoading];
};
export default useRole;

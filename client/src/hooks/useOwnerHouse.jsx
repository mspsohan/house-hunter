import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOwnerHouse = () => {
   const { user } = useAuth()
   const axiosSecure = useAxiosSecure()
   const { data, isLoading, refetch } = useQuery({
      queryKey: ["OwnerHouse"],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/api/house?email=${user?.email}`)
         return data
      }
   })
   return { data, isLoading, refetch }
};

export default useOwnerHouse;
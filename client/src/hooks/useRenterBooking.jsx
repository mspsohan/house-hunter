import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRenterBooking = () => {
   const { user } = useAuth()
   const axiosSecure = useAxiosSecure()
   const { data, isLoading, refetch } = useQuery({
      queryKey: ["renterBooking", user?.email],
      queryFn: async () => {
         // const { data } = await axiosSecure.get(`/api/house?email=${user?.email}`)
         const { data } = await axiosSecure.get(`/api/booking`)
         return data
      }
   })
   return { data, isLoading, refetch }
};

export default useRenterBooking;
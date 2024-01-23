import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllHouse = (filters) => {
   // console.log(filters?.rowsPerPage)
   // const random = Math.floor(Math.random() * (filters?.rowsPerPage - 1 + 1)) + 2;
   const axiosPublic = useAxiosPublic();

   const { data, isLoading, refetch } = useQuery({
      queryKey: ["AllHouse", filters],
      queryFn: async () => {
         const { data } = await axiosPublic.get("/api/house/all", { params: filters });
         return data;
      },
   });

   return { data, isLoading, refetch };
};

export default useAllHouse;
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import useOwnerHouse from "../../../hooks/useOwnerHouse";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import EmptyRoom from "../../EmptyRoom/EmptyRoom";

const OwnerDashboard = () => {
   const axiosSecure = useAxiosSecure()
   const { data: ownerHouse, isLoading, refetch } = useOwnerHouse()

   const handleDelete = async (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
         if (result.isConfirmed) {
            try {
               const { data } = await axiosSecure.delete(`/api/house/${id}`);
               refetch()
               toast.success(data?.message)
            } catch (error) {
               toast.error(error)
               console.error("Error deleting house:", error);
            }
         }
      });
   };

   if (isLoading) {
      return <div>Loading.....</div>
   }

   return (
      <>
         {
            ownerHouse?.length === 0 ? <EmptyRoom /> : (
               <div className="py-3">
                  <div className="container px-3 mx-auto">
                     <div className="overflow-x-auto rounded shadow dark:bg-gray-900 bg-gray-50">
                        <table className="w-full table-auto border-separate border-spacing-2 border border-slate-400">
                           <thead className="bg-lightGray-50">
                              <tr className="text-xs text-left text-gray-500 border-b border-gray-200 ark:border-gray-800">
                                 <th className="py-4 pl-6 font-medium dark:text-gray-400 border border-slate-300">Image</th>
                                 <th className="px-6 py-4 font-medium dark:text-gray-400 border border-slate-300">Name</th>
                                 <th className="px-6 py-4 font-medium dark:text-gray-400 border border-slate-300">Address</th>
                                 <th className="px-6 py-4 font-medium dark:text-gray-400 border border-slate-300 w-0">Rent Per Month</th>
                                 <th className="px-6 py-4 font-medium dark:text-gray-400 border border-slate-300">Phone Number</th>
                                 <th className="px-6 py-4 font-medium dark:text-gray-400 border border-slate-300 w-0">Availability Date</th>
                                 <th className="px-6 py-4 font-medium dark:text-gray-400 text-center border border-slate-300">Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {
                                 ownerHouse?.map(house => (
                                    <tr key={house?._id} className="border-b border-gray-200 dark:border-gray-800">
                                       <td className=" px-2 py-1 font-medium border border-slate-300 w-20">
                                          <img className=" w-16 h-16 mr-4 rounded-md object-cover"
                                             src={house?.picture}
                                             alt="" />
                                       </td>
                                       <td className="px-6 text-sm font-medium dark:text-gray-400 border border-slate-300">{house?.houseName}</td>
                                       <td className="px-6 text-sm font-medium dark:text-gray-400 border border-slate-300">{house?.address}</td>
                                       <td className="px-6 text-sm font-medium dark:text-gray-400 border border-slate-300">${house?.rent}</td>
                                       <td className="px-6 text-sm font-medium dark:text-gray-400 border border-slate-300 w-0">+{house?.number}</td>
                                       <td className="px-6 text-sm font-medium dark:text-gray-400 border border-slate-300 min-w-12">{house?.availability}</td>
                                       <td className="px-6 border border-slate-300 w-0">
                                          <div className="flex justify-center">
                                             <Link to={`/dashboard/updatehouse/${house?._id}`} className="px-4 py-2 mr-4 text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300"><FaRegEdit className="text-xl" /></Link>
                                             <button onClick={() => handleDelete(house?._id)} className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-300"><RiDeleteBinLine className="text-xl" /></button>
                                          </div>
                                       </td>
                                    </tr>
                                 ))
                              }
                           </tbody>
                        </table>
                        <div className="px-6 py-5 text-right">
                           <a className="inline-flex items-center text-xs font-medium text-blue-500 dark:hover:text-blue-400 dark:text-blue-300 hover:text-blue-700"
                              href="#">
                              <span className="mr-1">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path
                                       d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                 </svg>
                              </span>
                              <span>View all</span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }
      </>
   );
};

export default OwnerDashboard;
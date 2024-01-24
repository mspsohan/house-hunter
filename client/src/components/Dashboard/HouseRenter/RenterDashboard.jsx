import toast from "react-hot-toast";
import useRenterBooking from "../../../hooks/useRenterBooking";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmptyBooked from "../../EmptyRoom/EmptyBooked";

const RenterDashboard = () => {
   const { data: bookedHouse, isLoading, refetch } = useRenterBooking()
   const axiosSecure = useAxiosSecure()

   const handleDelete = async (id) => {
      console.log(id)
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
               const { data } = await axiosSecure.delete(`/api/booking/${id}`);
               console.log(data)
               refetch()
               toast.success(data?.message)
            } catch (error) {
               toast.error(error)
               console.error("Error deleting House from Booked List:", error);
            }
         }
      });
   };

   if (isLoading) {
      return <div>Loading.....</div>
   }

   return (
      <div>
         <div className="text-center mb-10">
            <h1 className="text-2xl md:text-4xl font-bold font-serif mb-3">Your Booking</h1>
            <p>Choose the Best</p>
         </div>

         {
            bookedHouse?.length === 0 ? <EmptyBooked /> : (
               <div>
                  <div className="flex items-center pb-16 bg-white lg:pb-20 font-poppins dark:bg-gray-900 ">
                     <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto text-left lg:pb-10 ">
                        {
                           bookedHouse?.map(house => (
                              <div key={house?._id}
                                 className="grid grid-cols-1 mb-6 md:grid-cols-[40%,1fr] border-gray-200 rounded-md border dark:border-gray-800  gap-2">
                                 <div className="h-80">
                                    <img src={house?.picture} alt="" className="object-cover w-full rounded-md h-80 md:h-full p-3 border border-gray-200" />
                                 </div>
                                 <div className="px-4 py-4 lg:px-2 relative">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 ">
                                       Booked Date:  {house?.createdAt.split('T')[0]}
                                    </p>
                                    <div className="w-8 pb-1 mb-4 border-b border-gray-600 dark:border-gray-400"></div>
                                    <h2 className="mt-2 mb-4 text-xl font-semibold text-gray-600 dark:text-gray-300 ">
                                       {house?.houseName}</h2>
                                    <p className="py-2">Address <span>{house?.address}</span></p>
                                    <p>Rent: {house?.rent}</p>
                                    <p>Description:</p>
                                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                       {house?.description.slice(0, 200)} ...
                                    </p>
                                    <div className="flex items-end absolute bottom-2">
                                       <button onClick={() => handleDelete(house?._id)} className="bg-blue-400 hover:bg-blue-600 py-1 px-2 rounded-md text-white font-medium">Remove From Booked List</button>
                                    </div>
                                 </div>
                              </div>
                           ))
                        }
                     </div>
                  </div>
               </div>
            )
         }
      </div>
   );
};

export default RenterDashboard;
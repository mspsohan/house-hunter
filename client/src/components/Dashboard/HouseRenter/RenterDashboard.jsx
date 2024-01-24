import useRenterBooking from "../../../hooks/useRenterBooking";

const RenterDashboard = () => {
   const { data } = useRenterBooking()
   console.log(data)
   return (
      <div>
         <div className="text-center mb-10">
            <h1 className="text-2xl md:text-4xl font-bold font-serif mb-3">Your Booking</h1>
            <p>Choose the Best</p>
         </div>

         <div>
            <section className="flex items-center bg-white lg:h-screen dark:bg-gray-800 font-poppins">
               <div className="max-w-6xl px-4 mx-auto">
                  <div className="flex flex-wrap items-center justify-center ">
                     <div className="w-full mx-auto mb-16 sm:w-4/5 sm:mb-0">
                        <div className="">
                           <div className="flex flex-wrap pb-8 ">
                              <div className="self-stretch w-full overflow-hidden lg:w-1/2 ">
                                 <div className="h-96 w-96"><img className="object-cover w-full h-full"
                                    src="https://i.postimg.cc/SKFFcpqx/pexels-jonas-mohamadi-1416736.jpg" alt="" />
                                 </div>
                              </div>
                              <div className="w-full lg:w-1/2">
                                 <div className="p-8 bg-gray-100 rounded shadow dark:bg-gray-700 lg:h-96">
                                    <h2 className="text-xl font-semibold mb-4">Title</h2>
                                    <p className="mb-8 leading-loose dark:text-gray-400 text-blueGray-400">Description</p>
                                    <div className="flex items-center ">
                                       <img className="object-cover w-16 h-16 rounded-full"
                                          src="https://i.postimg.cc/SKFFcpqx/pexels-jonas-mohamadi-1416736.jpg"
                                          alt="" />
                                       <div className="pl-4">
                                          <p className="text-xl dark:text-gray-300">John Bailey</p>
                                          <p className="text-blue-600 dark:text-blue-400">CEO</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="w-full mx-auto mb-16 sm:w-4/5 sm:mb-0">
                        <div className="">
                           <div className="flex flex-wrap pb-8 ">
                              <div className="self-stretch w-full overflow-hidden lg:w-1/2 ">
                                 <div className="h-96 w-96"><img className="object-cover w-full h-full"
                                    src="https://i.postimg.cc/SKFFcpqx/pexels-jonas-mohamadi-1416736.jpg" alt="" />
                                 </div>
                              </div>
                              <div className="w-full lg:w-1/2">
                                 <div className="p-8 bg-gray-100 rounded shadow dark:bg-gray-700 lg:h-96">
                                    <h2 className="text-xl font-semibold mb-4">Title</h2>
                                    <p className="mb-8 leading-loose dark:text-gray-400 text-blueGray-400">Description</p>
                                    <div className="flex items-center ">
                                       <img className="object-cover w-16 h-16 rounded-full"
                                          src="https://i.postimg.cc/SKFFcpqx/pexels-jonas-mohamadi-1416736.jpg"
                                          alt="" />
                                       <div className="pl-4">
                                          <p className="text-xl dark:text-gray-300">John Bailey</p>
                                          <p className="text-blue-600 dark:text-blue-400">CEO</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>

               </div>
            </section>
         </div>
      </div>
   );
};

export default RenterDashboard;
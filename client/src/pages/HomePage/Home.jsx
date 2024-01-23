import useAllHouse from "../../hooks/useAllHouse";
import { IoLocationOutline } from "react-icons/io5";
import { BsCalendar2Day } from "react-icons/bs";
import { useState } from "react";
import { TablePagination } from "@mui/material";

const Home = () => {
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(10);
   const [house, setHouse] = useState('');
   const [city, setCity] = useState('');
   const [bedroom, setBedroom] = useState('');
   const [bathroom, setBathroom] = useState('');
   const [roomSize, setRoomSize] = useState(100000)
   const [availability, setAvailability] = useState('')
   const [rangeValue, setRangeValue] = useState(100000);

   const { data: allHouses } = useAllHouse({ page, rowsPerPage, house, city, bedroom, bathroom, roomSize, availability, rangeValue });

   const allHouse = allHouses?.result
   // ============================================
   // MIUI Pagination Handler
   const count = allHouses?.totalCount
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };
   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
   };
   // =============================================

   return (
      <>
         <div className="max-w-[1280px] mx-auto my-20">
            <div className="text-center mb-10">
               <h1 className="text-2xl md:text-4xl font-bold font-serif mb-3">For Rates & Availability</h1>
               <p>Search your House</p>
            </div>

            <div className="grid grid-cols-6 lg:grid-cols-7 gap-5 px-3">
               <div className="col-span-3 lg:col-span-1">
                  <label htmlFor="">House</label>
                  <input onChange={(e) => setHouse(e.target.value)} type="text" placeholder="House" name="" id="" className="w-full p-2 outline-none border border-gray-500 rounded-md" />
               </div>
               <div className="col-span-3 lg:col-span-1">
                  <label htmlFor="">City</label>
                  <input onChange={(e) => setCity(e.target.value)} type="text" placeholder="Type City" name="" id="" className="w-full p-2 outline-none border border-gray-500 rounded-md" />
               </div>
               <div className="col-span-2 lg:col-span-1">
                  <label htmlFor="">Bedroom</label>
                  <input onChange={(e) => setBedroom(e.target.value)} type="number" placeholder="Bedroom" name="" id="" className="w-full p-2 outline-none border border-gray-500 rounded-md" />
               </div>
               <div className="col-span-2 lg:col-span-1">
                  <label htmlFor="">Bathroom</label>
                  <input onChange={(e) => setBathroom(e.target.value)} type="number" placeholder="Bathroom" name="" id="" className="w-full p-2 outline-none border border-gray-500 rounded-md" />
               </div>
               <div className="col-span-2 lg:col-span-1">
                  <label htmlFor="">Room Size</label>
                  <input onChange={(e) => setRoomSize(e.target.value)} type="number" placeholder="Room Size" name="" id="" className="w-full p-2 outline-none border border-gray-500 rounded-md" />
               </div>
               <div className="col-span-3 lg:col-span-1">
                  <label htmlFor="">Availability</label>
                  <input onChange={(e) => setAvailability(e.target.value)} type="date" placeholder="Availability" name="" id="" className="w-full p-2 outline-none border border-gray-500 rounded-md" />
               </div>
               <div className="col-span-3 lg:col-span-1">
                  <label htmlFor="range" className="">Rent </label>
                  <div className="border border-gray-800 rounded-md p-2">
                     <input
                        type="range"
                        id="range"
                        name="range"
                        min="1"
                        max="100000"
                        value={rangeValue}
                        onChange={(e) => setRangeValue(parseInt(e.target.value, 10))}
                        className="w-full border border-gray-800 rounded-md"
                     />
                  </div>
                  <div className="flex justify-between">
                     <span>1</span>
                     <span>{rangeValue}</span>
                  </div>
               </div>
               <div className="col-span-7 mx-auto">
                  <button className="w-48 rounded-3xl text-white text-xl mx-auto bg-blue-500 hover:bg-blue-800 py-2 px-4">Check Availability</button>
               </div>
            </div>

            <div className="text-center my-10">
               <h1 className="text-2xl md:text-4xl font-bold font-serif mb-3">Rooms & Apartments</h1>
               <p>FIND YOUR ROOMS, FOR YOUR ABAILITY</p>
            </div>
            <div>
               <div className="flex items-center font-poppins dark:bg-gray-900 ">
                  <div className="justify-center px-4 py-4 mx-auto lg:py-0">
                     <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
                        {
                           allHouse?.map(house => (
                              <div key={house?._id} className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] min-w-96">
                                 <div className="relative w-full h-56 ">
                                    <img src={house?.picture} alt=""
                                       className="object-cover w-full h-full " />
                                    {/* <span className="absolute top-0 left-0 px-2 py-1 mt-2 ml-2 text-xs text-white bg-blue-700">
                                       Lifestyle</span> */}
                                 </div>
                                 <div className="p-4 bg-white dark:bg-gray-700">
                                    <div className="flex items-center justify-between mb-1">
                                       <div>
                                          <a href="">
                                             <h2 className="text-xl font-semibold dark:text-gray-300">{house?.houseName}</h2>
                                          </a>
                                       </div>
                                       <div className="flex">
                                          {/*  */}
                                       </div>
                                    </div>
                                    <div className="flex items-center mb-4">
                                       <p className="mr-1 text-blue-600 dark:text-gray-300">
                                          <IoLocationOutline />
                                       </p>
                                       <span className="text-sm text-gray-600 dark:text-gray-400">{house?.city}</span>
                                    </div>
                                    <h3 className="mb-4 h-16 text-lg font-medium text-gray-700 dark:text-gray-400">
                                       {house?.description.slice(0, 80)} ... <span>{house?.rent}</span>
                                    </h3>
                                    <div className="flex items-center justify-between ">
                                       <div className="flex items-center">
                                          <p className="mr-2 text-blue-700 dark:text-gray-400">
                                             <BsCalendar2Day />
                                          </p>
                                          <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Availability: {house?.availability}</span>
                                       </div>
                                       <a href="#"
                                          className="px-3 py-2 text-xs text-gray-100 bg-blue-700 rounded hover:bg-blue-600 hover:text-gray-100">
                                          Add Booking</a>
                                    </div>
                                 </div>
                              </div>
                           ))
                        }

                     </div>
                  </div>
               </div>
               <div className="border-2 m-3 rounded-md ">
                  <TablePagination
                     component="div"
                     count={count || 0}
                     page={page || 0}
                     onPageChange={handleChangePage}
                     rowsPerPage={rowsPerPage}
                     onRowsPerPageChange={handleChangeRowsPerPage}
                     rowsPerPageOptions={[5, 10, 20, 50]}
                  />
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
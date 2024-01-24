import { useEffect, useState } from "react";
import { FaAngleDown, FaRegUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { GrDashboard } from "react-icons/gr";
import { HiOutlineMenu } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
   const [showMenu, setShowMenu] = useState(false)
   const [profile, setProfile] = useState(false)
   const { user, setUser } = useAuth();
   const navigate = useNavigate()
   const handleLogout = () => {
      localStorage.removeItem('userInfo');
      setUser(null);
      setProfile(false)
   };

   useEffect(() => {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
         const parsedUserInfo = JSON.parse(storedUserInfo);
         setUser(parsedUserInfo);
      }
   }, []);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"))
      if (!user) {
         navigate("/")
      }
   }, [user])

   return (
      <>
         <section className="relative bg-gray-100 border-b font-poppins dark:bg-gray-800 dark:border-gray-800">
            <div className="container mx-auto" x-data="{open:false}">
               <nav className="flex justify-between ">
                  <div className="flex items-center justify-between w-full px-4 py-2 lg:px-2 ">
                     <a href="#" className="text-2xl font-bold text-gray-700 dark:text-gray-400">House <span className="text-yellow-500"> Hunter</span></a>
                     <div className="flex items-center lg:hidden ">
                        <a href="#" className="flex items-center mr-4 dark:text-gray-400">
                           <FaShoppingCart className="text-2xl text-gray-700" />
                        </a>
                        <button onClick={() => setShowMenu(true)} className="flex items-center px-3 py-2 text-blue-600 border border-blue-200 rounded dark:text-gray-400 hover:text-blue-800 hover:border-blue-300 lg:hidden">
                           <HiOutlineMenu className="text-2xl text-gray-700" />
                        </button>
                     </div>

                     {/* <ul className="hidden font-medium lg:flex">
                        <li className="mr-12"><a href=""
                           className="text-gray-700 hover:text-gray-600 dark:text-gray-400">Product</a>
                        </li>
                        <li className="mr-12"><a href=""
                           className="text-gray-700 hover:text-gray-600 dark:text-gray-400">Category</a>
                        </li>
                        <li className="mr-12"><a href=""
                           className="text-gray-700 hover:text-gray-600 dark:text-gray-400">Collection</a>
                        </li>
                        <li className="mr-12"><a href=""
                           className="text-gray-700 hover:text-gray-600 dark:text-gray-400">Brand</a>
                        </li>
                     </ul> */}

                     {/* <div className="items-center hidden max-w-xs py-2 pl-4 bg-white rounded-lg dark:text-gray-300 dark:bg-gray-600 lg:flex">
                        <FaSearch className="text-4xl text-gray-500 mr-3" />
                        <input type="text" className="w-full outline-gray-500 py-2 pl-3 border-0 dark:text-gray-300 dark:bg-gray-600"
                           placeholder="Search..." />
                        <div className="pr-4">
                           <select name="" id=""
                              className="pl-3 pr-4 border-0 border-l border-gray-400 cursor-pointer dark:bg-gray-600">
                              <option value="">All items</option>
                              <option value="">Option 1</option>
                              <option value="">Option 2</option>
                           </select>
                        </div>
                     </div> */}
                     <div className="items-center justify-end hidden lg:flex dark:text-gray-400">
                        <a href="#" className="flex items-center dark:text-gray-400 hover:bg-gray-400 p-3 rounded-full">
                           <FaShoppingCart className="text-2xl text-gray-700" />
                        </a>

                        {/* prpofile dropdown */}
                        <div className='relative text-left lg:inline-block'>
                           <div onClick={() => setProfile(!profile)} className='lg:block'>
                              <button className='flex items-center'>
                                 <div className='hidden mr-3 text-right md:block'>
                                    <p className='text-sm font-bold text-black dark:text-white'>
                                       {user?.name}
                                    </p>
                                 </div>
                                 <div className='mr-2'>
                                    <img src='https://i.ibb.co/6HtdFTk/585e4bf3cb11b227491c339a.png'
                                       className='object-cover object-right w-10 h-10 rounded-full' alt='person' />
                                 </div>
                                 <span>
                                    <FaAngleDown className='text-gray-600 text-xl' />
                                 </span>
                              </button>
                           </div>
                           <div id='dropdown_profile' className={`absolute right-0 w-48 mt-4 origin-top-right bg-white rounded shadow dark:bg-gray-700 ${profile ? '' : 'hidden'
                              }`}>
                              <div className='py-1'>
                                 <a href='#'
                                    className='flex items-center px-4 py-2 text-base text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'>
                                    <IoSettingsOutline className='mr-2 text-xl' />
                                    Account
                                 </a>
                                 {
                                    user && <Link to='/dashboard'
                                       className='flex items-center px-4 py-2 text-base text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 w-full hover:bg-gray-100'>
                                       <GrDashboard className='w-5 h-5 dark:group-hover:text-gray-400 mr-2' />
                                       Dashboard
                                    </Link>
                                 }
                                 {
                                    !user ? <Link to="/login" className='flex items-center px-4 w-full py-2 text-base text-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-100'><FiLogIn className='text-xl mr-2' /> Login</Link> : <button onClick={handleLogout} className='flex items-center px-4 w-full py-2 text-base text-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-100'>
                                       <FiLogOut className='text-xl mr-2' />
                                       Logout
                                    </button>
                                 }
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </nav>

               {/* Mobile */}
               {showMenu && (
                  <div className="fixed inset-0 w-full bg-gray-800 opacity-25 lg:hidden dark:bg-gray-400" />
               )}

               <div
                  className={`absolute inset-0 z-10 h-screen p-3 text-gray-700 duration-500 transform shadow-md dark:bg-gray-800 bg-blue-50 w-80 lg:hidden lg:transform-none lg:relative 
                  ${showMenu
                        ? 'translate-x-0 ease-in-opacity-100'
                        : '-translate-x-full ease-out opacity-0'
                     }`}>
                  <div className="flex justify-between">
                     <a className="p-2 text-2xl font-bold dark:text-gray-400" href="#">Logo</a>
                     <button onClick={() => setShowMenu(false)} className="p-2 rounded-md hover:text-blue-300 lg:hidden dark:text-gray-300">
                        <IoIosCloseCircleOutline className="text-3xl text-gray-700" />
                     </button>
                  </div >
                  <div className="flex items-center px-5 mt-7 lg:hidden">
                     <a href="" className="items-center mr-4 text-sm font-semibold lg:flex dark:text-gray-400">
                        <FaSearch className="text-2xl text-gray-500 mr-3" />
                     </a>
                     <a href="" className="flex items-center mr-4 dark:text-gray-400">
                        <FaShoppingCart className="text-2xl text-gray-700" />
                     </a>
                  </div>
                  <div
                     className="flex items-center max-w-xs py-2 pl-4 bg-white rounded-lg mt-7 dark:text-gray-300 dark:bg-gray-600 lg:hidden">
                     <input type="text" className="w-full py-2 pl-3 border-0 dark:text-gray-300 dark:bg-gray-600"
                        placeholder="Search..." />
                     <FaSearch className="text-3xl text-gray-500 mr-3" />
                  </div>
                  {/* <ul className="px-5 text-left mt-7">
                     <li className="pb-3">
                        <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-100">Home</a>
                     </li>
                     <li className="pb-3">
                        <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">About us</a>
                     </li>
                     <li className="pb-3">
                        <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">Features</a>
                     </li>
                     <li className="pb-3">
                        <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">Blog </a>
                     </li>
                     <li className="pb-3">
                        <a href="" className="text-sm text-gray-700 hover:text-blue-400 dark:text-gray-400">Testimonials</a>
                     </li>
                  </ul> */}
               </div >
            </div >
         </section >
      </>
   );
};

export default Navbar;
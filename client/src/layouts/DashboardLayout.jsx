import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { GrDashboard } from 'react-icons/gr';
import { RxDashboard } from 'react-icons/rx';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { FaAngleDown, FaListUl } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
   const [open, setOpen] = useState(false);
   const [profile, setProfile] = useState(false);

   const { user, setUser } = useAuth();
   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('userInfo');
      setUser(null);
      setProfile(false);
   };

   const toggleProfile = () => {
      setProfile(!profile);
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
         navigate("/login")
      }
   }, [user])

   return (
      <>
         <div className='bg-white xl:h-screen dark:bg-gray-800'>
            <div className={`body-content ${open ? 'open' : ''}`}>
               <div className={`relative lg:block navbar-menu ${open ? 'w-0' : 'w-[280px]'}`}>
                  <div
                     className={`fixed top-0 transition-all lg:mt-0 mt-16 left-0 bottom-0 flex flex-col dark:bg-gray-900 bg-gray-800 overflow-hidden z-50  ${open ? 'w-0' : 'w-[280px]'
                        }`}
                     id='sidenav'>
                     <div className='flex items-center w-full px-4 pt-4 pb-4 border-b border-gray-600'>
                        <a href='#'>
                           <h2 className="text-2xl font-bold text-gray-200 dark:text-gray-400">House <span className="text-yellow-500"> Hunter</span>
                           </h2>
                        </a>
                     </div>
                     <div className='pb-6 mt-4 overflow-x-hidden overflow-y-auto'>
                        <p className='px-6 py-3 text-lg text-gray-300 bg-gray-600'>Dashboard</p>
                        <ul className='mb-8 text-sm'>
                           <li>
                              <Link to="/dashboard"
                                 className='flex items-center px-6 py-4 text-gray-300 dark:text-gray-400 group dark:hover:bg-gray-800 hover:text-white hover:bg-gray-900'>
                                 <span className='inline-block mr-3'>
                                    <GrDashboard className='w-5 h-5 dark:group-hover:text-gray-400' />
                                 </span>
                                 <span>Dashboard Home</span>
                              </Link>
                           </li>
                           {
                              user?.role === "owner" && <li>
                                 <Link to="/dashboard/addhouse"
                                    className='flex items-center px-6 py-4 text-gray-300 dark:hover:bg-gray-800 dark:text-gray-400 group hover:text-white hover:bg-gray-900'>
                                    <span className='inline-block mr-3'>
                                       <FaListUl className='w-5 h-5 dark:group-hover:text-gray-400' />
                                    </span>
                                    <span> Add New House </span>
                                 </Link>
                              </li>
                           }
                        </ul>
                        <p className='px-6 py-3 text-lg text-gray-300 bg-gray-600'>Main</p>
                        <ul className='mb-8 text-sm'>
                           <li>
                              <Link
                                 to='/'
                                 className='flex items-center px-6 py-4 text-gray-300 dark:hover:bg-gray-800 dark:text-gray-400 group hover:text-white hover:bg-gray-900'>
                                 <span className='inline-block mr-3'>
                                    <RxDashboard className='w-5 h-5 dark:group-hover:text-gray-400' />
                                 </span>
                                 <span> Home</span>
                              </Link>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className={`mx-auto transition-all content-wrapper ${open ? 'lg:ml-0' : 'lg:ml-[280px]'}`} id='dash'>
                  <div className='sticky top-0 z-40 px-3 py-3 bg-white shadow dark:bg-gray-900 lg:px-5'>
                     <nav className='relative'>
                        <div className='flex items-center justify-between'>
                           <div className='items-center mr-auto lg:flex'>
                              <button onClick={() => setOpen(!open)}
                                 className='px-2 py-2 text-blue-500 bg-blue-100 rounded dark:bg-gray-800 dark:text-gray-400'>
                                 <FiMenu className='text-2xl' />
                              </button>
                           </div>
                           <div className='flex items-center'>
                              <div className='mr-4'>
                                 <GoSearch />
                              </div>

                              <div className={`relative text-left lg:inline-block ${profile ? 'z-50' : ''}`}>
                                 <div onClick={toggleProfile} className='lg:block'>
                                    <button className='flex items-center'>
                                       <div className='hidden mr-3 text-right md:block'>
                                          <p className='text-sm font-bold text-black dark:text-white'>{user?.name}</p>
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
                                 <div id='dropdown_profile'
                                    className={`absolute right-0 w-48 mt-3 origin-top-right bg-white rounded shadow dark:bg-gray-700 ${profile ? '' : 'hidden'
                                       }`}>
                                    <div className='py-1'>
                                       <a href='#'
                                          className='flex items-center px-4 py-2 text-base text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100'>
                                          <IoSettingsOutline className='mr-2 text-xl' />
                                          Account
                                       </a>
                                       <button onClick={handleLogout}
                                          className='flex items-center px-4 py-2 text-base text-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 w-full'>
                                          <FiLogOut className='text-xl mr-2' />
                                          Logout
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </nav>
                  </div>
                  <div className='p-3'>
                     <Outlet />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default DashboardLayout;

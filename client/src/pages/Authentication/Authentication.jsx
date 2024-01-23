import { useEffect, useState } from "react";
import Login from "../../components/Authentications/Login";
import Registration from "../../components/Authentications/Registration";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
   const [openTab, setOpenTab] = useState(1);

   const navigate = useNavigate()
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"))
      if (user) {
         navigate("/")
      }
   }, [])

   return (
      <div>
         <div className="container mx-auto mt-12">
            <div className="flex flex-col items-center justify-center max-w-xl mx-auto">
               <div className="bg-yellow-400 w-full text-center py-2 mb-5">
                  <h2 className="text-2xl lg:text-4xl font-semibold">House Hunter</h2>
               </div>
               <ul className="flex justify-center w-full items-center space-x-2 px-3">
                  <li className="w-full">
                     <button
                        onClick={() => setOpenTab(1)}
                        className={` ${openTab === 1 ? "bg-purple-600 text-white" : ""} w-full inline-block px-4 py-2 text-gray-600 font-semibold rounded shadow`}
                     >
                        Login
                     </button>
                  </li>
                  <li className="w-full">
                     <button
                        onClick={() => setOpenTab(2)}
                        className={` ${openTab === 2 ? "bg-purple-600 text-white" : ""} w-full inline-block px-4 py-2 text-gray-600 font-semibold rounded shadow`}
                     >
                        Sign Up
                     </button>
                  </li>
               </ul>
               <div className="p-3 mt-6 bg-white border w-full rounded-md">
                  <div className={openTab === 1 ? "block" : "hidden"}>
                     <Login />
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"}>
                     <Registration />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Authentication;
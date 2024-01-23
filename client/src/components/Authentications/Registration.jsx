import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Registration = () => {
   const [show, setShow] = useState()
   const [name, setName] = useState("");
   const [role, setRole] = useState("");
   const [number, setNumber] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState()
   const navigate = useNavigate();


   const submitHandler = () => {

      // setLoading(true);
      if (!name || !role || !number || !email || !password) {
         toast.error("Please Fill all the Feilds");
         setLoading(false);
         return;
      }
      console.log(name, role, number, email, password)
      // try {
      //    const config = {
      //       headers: {
      //          "Content-type": "application/json",
      //       },
      //    };
      //    const { data } = await axios.post("/api/user", { name, role, number, email, password }, config);
      //    // toast({
      //    //    title: "Registration Successful",
      //    //    status: "success",
      //    //    duration: 5000,
      //    //    isClosable: true,
      //    //    position: "bottom",
      //    // });
      //    localStorage.setItem("userInfo", JSON.stringify(data));
      //    setLoading(false);
      //    navigate("/chats");
      // } catch (error) {
      //    // toast({
      //    //    title: "Error Occured!",
      //    //    description: error.response.data.message,
      //    //    status: "error",
      //    //    duration: 5000,
      //    //    isClosable: true,
      //    //    position: "bottom",
      //    // });
      //    setLoading(false);
      // }
   };

   if (loading) {
      return <div>Loading......</div>
   }
   return (
      <>
         <div className="space-y-3">
            <div>
               <label htmlFor="">Full Name</label>
               <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" id="" placeholder="Full Name" className="w-full outline-none border-gray-300 border-2 p-2" />
            </div>
            <div>
               <label htmlFor="">Select Role</label>
               <select value={role} onChange={(e) => setRole(e.target.value)} name="" id="" className="w-full outline-none border-gray-300 border-2 p-2">
                  <option disabled>Select One</option>
                  <option value="House Owner">House Owner</option>
                  <option value="House Renter">House Renter</option>
               </select>
            </div>
            <div>
               <label htmlFor="">Phone Number</label>
               <input onChange={(e) => setNumber(e.target.value)} type="number" name="" id="" placeholder="Your Phone Number" className="w-full outline-none border-gray-300 border-2 p-2" />
            </div>
            <div>
               <label htmlFor="email2">Email Address</label>
               <input value={email} placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} name="email" id="email2" className="w-full p-2 border-gray-300 outline-none rounded-sm border" />
            </div>
            <div className="relative">
               <label htmlFor="password2">Password</label>
               <input value={password} placeholder="Enter Your Password" type={!show ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} name="password" id="password2" className="w-full p-2 border-gray-300 outline-none rounded-sm border" />
               <button onClick={() => setShow(!show)} className="absolute right-0 bg-gray-400 p-2 text-white font-semibold rounded">{show ? "Hide" : "Show"}</button>
            </div>
            <div>
               <div>
                  <button onClick={submitHandler} type="submit" className="text-center w-full bg-purple-500 py-2 rounded-sm text-white text-2xl font-semibold">Sign Up</button>
               </div>
            </div>
         </div>
      </>
   );
};

export default Registration;
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [show, setShow] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()

   const submitHandler = async () => {
      setLoading(true)
      if (!email || !password) {
         toast.error("Please Fill all the Fields")
         setLoading(false)
         return
      }
      try {
         const config = {
            headers: {
               "content-type": "application/json"
            }
         }
         const { data } = await axios.post("http://localhost:5000/api/user/login", { email, password }, config)
         localStorage.setItem("userInfo", JSON.stringify(data))
         setLoading(false)
         toast.success("Login Successful")
         navigate("/")
      } catch (error) {
         setLoading(false)
         toast.error("Error Occured!", error.response.data.message)
      }
   }

   if (loading) {
      return <div>Loading.....</div>
   }
   return (
      <div>
         <div className="space-y-4">
            <div>
               <label htmlFor="email">Email Address</label>
               <input value={email} placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="w-full p-2 border-gray-300 outline-none rounded-md border" />
            </div>
            <div className="relative">
               <label htmlFor="password">Password</label>
               <input value={password} placeholder="Enter Your Password" type={!show ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="w-full p-2 border-gray-300 outline-none rounded-md border " />
               <button onClick={() => setShow(!show)} className="absolute right-0 bg-gray-400 p-2 text-white font-semibold rounded">{show ? "Hide" : "Show"}</button>
            </div>
            <div>
               <button onClick={submitHandler} type="submit" className="text-center w-full rounded-md bg-purple-500 py-1 text-white text-2xl font-semibold">Login</button>
            </div>
            <div>
               <button style={{ marginTop: 15 }} onClick={() => { setEmail("owner@example.com"); setPassword("1111A!a1") }} className="text-center w-full bg-purple-500 py-1 rounded-md text-white text-2xl font-semibold">
                  Get House Owner Credential
               </button>
            </div>
         </div>
      </div>
   );
};

export default Login;
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [show, setShow] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()

   const submitHandler = async (e) => {
      e.preventDefault()
      setLoading(true)
      if (!email || !password) {
         // toast({
         //    title: "Please Fill all the Fields",
         //    status: "warning",
         //    duration: 5000,
         //    isClosable: true,
         //    position: "bottom"
         // })
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
         // toast({
         //    title: "Login Successful",
         //    status: "success",
         //    duration: 5000,
         //    isClosable: true,
         //    position: "bottom"
         // })
         localStorage.setItem("userInfo", JSON.stringify(data))
         setLoading(false)
         navigate("/chats")
      } catch (error) {
         setLoading(false)
         // toast({
         //    title: "Error Occured!",
         //    description: error.response.data.message,
         //    status: "error",
         //    duration: 5000,
         //    isClosable: true,
         //    position: "bottom"
         // })
      }
   }

   if (loading) {
      return <div>Loading.....</div>
   }
   return (
      <div>
         <form onSubmit={submitHandler}>
            <div className="space-y-4">
               <div>
                  <label htmlFor="email">Email Address</label>
                  <input value={email} placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="w-full p-2 border-gray-300 outline-none rounded-sm border" />
               </div>
               <div className="relative">
                  <label htmlFor="password">Password</label>
                  <input value={password} placeholder="Enter Your Password" type={!show ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="w-full p-2 border-gray-300 outline-none rounded-sm border" />
                  <button onClick={() => setShow(!show)} className="absolute right-0 bg-gray-400 p-2 text-white font-semibold rounded">{show ? "Hide" : "Show"}</button>
               </div>
               <div>
                  <button type="submit" className="text-center w-full bg-purple-500 py-1 text-white text-2xl font-semibold">Login</button>
               </div>
               <div>
                  <button style={{ marginTop: 15 }} onClick={() => { setEmail("rental@example.com"); setPassword("1111A!a1") }} className="text-center w-full bg-purple-500 py-1 text-white text-2xl font-semibold">
                     Get Guest User Credential
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
};

export default Login;
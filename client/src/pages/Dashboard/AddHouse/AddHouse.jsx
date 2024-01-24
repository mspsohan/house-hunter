import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { GiSpinningSword } from "react-icons/gi";

const AddHouse = () => {
   const [houseName, setHouseName] = useState("")
   const [address, setAddress] = useState("")
   const [city, setCity] = useState("")
   const [bedroom, setBedroom] = useState("")
   const [bathroom, setBathroom] = useState("")
   const [roomSize, setRoomSize] = useState("")
   const [availability, setAvailability] = useState("")
   const [rent, setRent] = useState("")
   const [number, setNumber] = useState("")
   const [description, setDescription] = useState("")
   const [picture, setPicture] = useState("")
   const [picLoading, setPicLoading] = useState(false)
   const [loading, setLoading] = useState(false)
   const { user } = useAuth()
   const axiosPublic = useAxiosPublic()

   const postImage = (pics) => {
      setPicLoading(true)
      if (pics === undefined) {
         toast.error("Please Select an Image")
         return
      }

      if (pics.type === "image/jpeg" || pics.type === "image/png") {
         const data = new FormData()
         data.append("file", pics)
         data.append("upload_preset", "chatify")
         data.append("cloud_name", "devsohanbd")
         fetch("https://api.cloudinary.com/v1_1/devsohanbd/image/upload", {
            method: "post",
            body: data
         }).then((res) => res.json())
            .then(data => {
               setPicture(data.url.toString())
               toast.success("Picture Uploaded")
               setPicLoading(false)
            })
            .catch(err => {
               console.log(err)
               setPicLoading(false)
            })
      } else {
         toast.error("Please Select an Image")
         setPicLoading(false)
      }
   }

   const handleAddHouse = async () => {
      setLoading(true)

      const bdMobileNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

      if (!houseName || !address || !city || !bedroom || !bathroom || !roomSize || !availability || !rent || !number || !description || !picture) {
         toast.error("Please Fill all the Fields")
         setLoading(false)
         return
      }

      if (!bdMobileNumberRegex.test(number)) {
         toast.error("Please enter a valid Bangladeshi mobile number With Country Code (+88)");
         setLoading(false);
         return;
      }

      const houseData = {
         houseName,
         address,
         city,
         bedroom: parseInt(bedroom),
         bathroom: parseInt(bathroom),
         roomSize: parseInt(roomSize),
         availability,
         rent: parseInt(rent),
         number: parseInt(number),
         description,
         picture,
         houseOwner: user?.name,
         ownerEmail: user?.email
      }

      try {
         const config = {
            headers: {
               "Content-type": "application/json",
            },
         };
         await axiosPublic.post("/api/house", houseData, config);
         toast.success("House Added Successful");
         setLoading(false);
      } catch (error) {
         toast.error(error.response.data.message);
         setLoading(false);
      }
   }

   if (loading) {
      return <div>Loading......</div>
   }

   return (
      <>
         <div className="max-w-screen-md mx-auto">
            <div className="bg-yellow-400 py-2 rounded-md">
               <h2 className="text-3xl font-bold text-blue-800 text-center">Add Your House</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-5 border border-gray-400 rounded-md p-3">
               <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">House Name</label>
                  <input onChange={(e) => setHouseName(e.target.value)} type="text" name="" id="" placeholder="House Name" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">House Address</label>
                  <input onChange={(e) => setAddress(e.target.value)} type="text" name="" id="" placeholder="House Address" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">City</label>
                  <input onChange={(e) => setCity(e.target.value)} type="text" name="" id="" placeholder="City" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Bedrooms</label>
                  <input onChange={(e) => setBedroom(e.target.value)} type="number" name="" id="" placeholder="Bedrooms" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Bathrooms</label>
                  <input onChange={(e) => setBathroom(e.target.value)} type="number" name="" id="" placeholder="Bathrooms" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Room Size (Squire Feet)</label>
                  <input onChange={(e) => setRoomSize(e.target.value)} type="number" name="" id="" placeholder="Room Size" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Avaiabillity Date</label>
                  <input onChange={(e) => setAvailability(e.target.value)} type="date" name="" id="" placeholder="City" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Rent Per Month</label>
                  <input onChange={(e) => setRent(e.target.value)} type="number" name="" id="" placeholder="Rent Per Month" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Phone Number (+880)</label>
                  <input onChange={(e) => setNumber(e.target.value)} defaultValue={+880178961606} type="number" name="" id="" placeholder="Phone Number" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">Picture</label>
                  <input onChange={(e) => postImage(e.target.files[0])} accept="image/*" type="file" name="" id="" placeholder="Picture" className="w-full p-[9px] border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-2">
                  <label htmlFor="">Description</label>
                  <textarea onChange={(e) => setDescription(e.target.value)} type="text" name="" id="" placeholder="Description" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-2 bg-yellow-200 hover:bg-yellow-400">
                  <button onClick={handleAddHouse} type="text" name="" id="" placeholder="Description" className="w-full p-2 font-semibold border rounded-md border-gray-400 outline-none text-2xl">
                     {picLoading ? <GiSpinningSword className="animate-spin mx-auto" /> : "Submit"}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default AddHouse;
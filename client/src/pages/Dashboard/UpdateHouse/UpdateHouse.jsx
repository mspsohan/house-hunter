import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { GiSpinningSword } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import useOwnerHouse from "../../../hooks/useOwnerHouse";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateHouse = () => {
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
   const axiosSecure = useAxiosSecure()
   const navigate = useNavigate()

   const { id } = useParams();
   const { data, isLoading } = useOwnerHouse();
   const singleHouse = data?.find(house => house?._id === id)

   useEffect(() => {
      if (!isLoading && singleHouse) {
         setHouseName(singleHouse?.houseName || '');
         setAddress(singleHouse?.address || '');
         setCity(singleHouse?.city || '');
         setBedroom(singleHouse?.bedroom || '');
         setBathroom(singleHouse?.bathroom || '');
         setRoomSize(singleHouse?.roomSize || '');
         setAvailability(singleHouse?.availability || '');
         setRent(singleHouse?.rent || '');
         setNumber(singleHouse?.number || '');
         setDescription(singleHouse?.description || '');
         setPicture(singleHouse?.picture || "")
      }
   }, [isLoading, singleHouse]);

   const postImage = (pics) => {
      setPicLoading(true)
      if (pics === undefined) {
         toast.error("Please Select an Image")
         return
      }
      setPicLoading(false)

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
      console.log(houseName, address, city, bedroom, bathroom, roomSize, availability, rent, number, description, picture)

      const bdMobileNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;

      if (!houseName || !address || !city || !bedroom || !bathroom || !roomSize || !availability || !rent || !number || !description) {
         toast.error("Please Fill all the Fields")
         setLoading(false)
         return
      }

      if (!bdMobileNumberRegex.test(number)) {
         toast.error("Please enter a valid Bangladeshi mobile number");
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
         await axiosSecure.put(`/api/house/${id}`, houseData, config);
         toast.success("House Updated Successful");
         setLoading(false);
         navigate('/dashboard')
      } catch (error) {
         console.log(error)
         toast.error(error.response.data.message);
         setLoading(false);
      }
   }

   if (loading) {
      return <div>Loading......</div>
   }

   if (isLoading) {
      return <div>Loading......</div>;
   }

   return (
      <>
         <div className="max-w-screen-md mx-auto">
            <div className="bg-blue-800  py-2 rounded-md">
               <h2 className="text-3xl font-bold text-yellow-400 text-center">Update Your House</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mt-5 border border-gray-400 rounded-md p-3">
               <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">House Name</label>
                  <input onChange={(e) => setHouseName(e.target.value)} defaultValue={houseName} type="text" name="" id="" placeholder="House Name" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">House Address</label>
                  <input onChange={(e) => setAddress(e.target.value)} defaultValue={address} type="text" name="" id="" placeholder="House Address" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">City</label>
                  <input onChange={(e) => setCity(e.target.value)} defaultValue={city} type="text" name="" id="" placeholder="City" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Bedrooms</label>
                  <input onChange={(e) => setBedroom(e.target.value)} defaultValue={bedroom} type="number" name="" id="" placeholder="Bedrooms" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Bathrooms</label>
                  <input onChange={(e) => setBathroom(e.target.value)} defaultValue={bathroom} type="number" name="" id="" placeholder="Bathrooms" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Room Size (Squire Feet)</label>
                  <input onChange={(e) => setRoomSize(e.target.value)} defaultValue={roomSize} type="number" name="" id="" placeholder="Room Size" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Avaiabillity Date</label>
                  <input onChange={(e) => setAvailability(e.target.value)} defaultValue={availability} type="date" name="" id="" placeholder="City" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Rent Per Month</label>
                  <input onChange={(e) => setRent(e.target.value)} defaultValue={rent} type="number" name="" id="" placeholder="Rent Per Month" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-1">
                  <label htmlFor="">Phone Number (+880)</label>
                  <input onChange={(e) => setNumber(e.target.value)} defaultValue={number} type="number" name="" id="" placeholder="Phone Number" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">Picture</label>
                  <input onChange={(e) => postImage(e.target.files[0])} accept="image/*" type="file" name="" id="" placeholder="Picture" className="w-full p-[9px] border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-2">
                  <label htmlFor="">Description</label>
                  <textarea onChange={(e) => setDescription(e.target.value)} defaultValue={description} type="text" name="" id="" placeholder="Description" className="w-full p-3 border rounded-md border-gray-400 outline-none" />
               </div>
               <div className="col-span-2 bg-blue-200 hover:bg-blue-400">
                  <button onClick={handleAddHouse} type="text" name="" id="" placeholder="Description" className="w-full p-2 font-semibold border rounded-md border-gray-400 outline-none text-2xl">
                     {picLoading ? <GiSpinningSword className="animate-spin mx-auto" /> : "Update"}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default UpdateHouse;
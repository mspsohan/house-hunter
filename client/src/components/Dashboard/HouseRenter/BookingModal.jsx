import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { Input, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '1px solid #fafafa',
   borderRadius: '5px',
   boxShadow: 24,
   p: 4,
};

const BookingModal = ({ open, handleClose, house }) => {
   const [number, setNumber] = useState("")
   const [loading, setLoading] = useState(false)
   const { user } = useAuth()
   const axiosPublic = useAxiosPublic()


   const handleBooking = async () => {
      setLoading(true);
      const bdMobileNumberRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
      if (!bdMobileNumberRegex.test(number)) {
         toast.error("Please enter a valid Bangladeshi mobile number With Country Code (+88)");
         setLoading(false);
         return;
      }

      const bookingData = {
         houseId: house?._id,
         houseName: house?.houseName,
         address: house?.address,
         city: house?.city,
         bedroom: house?.bedroom,
         bathroom: house?.bathroom,
         roomSize: house?.roomSize,
         availability: house?.availability,
         rent: house?.rent,
         number: house?.number,
         description: house?.description,
         picture: house?.picture,
         houseOwner: house?.houseOwner,
         ownerEmail: house?.ownerEmail,
         renterName: user?.name,
         renterEmail: user?.email,
         renterNumber: parseInt(number)
      }

      try {
         const config = {
            headers: {
               "Content-type": "application/json",
            },
         };
         await axiosPublic.post("/api/booking", bookingData, config);
         toast.success("House Booking Successful");
         setLoading(false);
         handleClose();
      } catch (error) {
         const errorMessage = error?.response?.data?.error || "An error occurred during booking.";
         toast.error(errorMessage);
         setLoading(false);
         handleClose()
      }
   }



   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', fontWeight: 600 }}>
                  Give Booking Details
               </Typography>
               <Box sx={{ mt: "20px" }}>
                  <TextField value={user?.name} InputProps={{
                     readOnly: true,
                  }} label="Your Name" color="secondary" focused sx={{ width: '100%' }} placeholder='Your Email' />
                  <TextField value={user?.email} label="Your Email" InputProps={{
                     readOnly: true,
                  }} color="secondary" focused sx={{ width: '100%', mt: '20px' }} placeholder='Your Name' />
                  <TextField onChange={(e) => setNumber(e.target.value)} label="Your Phone Number" color="secondary" focused sx={{ width: '100%', mt: '20px' }} placeholder='Your Phone Number ' />
                  <Button onClick={handleBooking} sx={{ width: '100%', background: "#3085d6", mt: 2, color: 'white', fontSize: '18px', ":hover": { background: "#9b27af" } }}>Book Now</Button>
               </Box>
            </Box>
         </Modal>
      </div >
   );
}

export default BookingModal
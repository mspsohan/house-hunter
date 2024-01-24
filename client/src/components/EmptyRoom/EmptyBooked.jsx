import { Link } from "react-router-dom";

const EmptyBooked = () => {

   return (
      <>
         <div className="min-h-[50vh] flex justify-center items-center flex-col">
            <h2 className="text-2xl md:text-4xl font-semibold">You Don't Booked any House Yet</h2>
            <Link to="/" className="mt-5 px-4 py-2 bg-yellow-800 text-white text-xl font-semibold rounded-md hover:bg-yellow-500">Go For Booked A House</Link>
         </div>
      </>
   );
};

export default EmptyBooked;
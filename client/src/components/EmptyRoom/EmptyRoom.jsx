import { Link } from "react-router-dom";

const EmptyRoom = () => {
   return (
      <>
         <div className="min-h-[50vh] flex justify-center items-center flex-col">
            <h2 className="text-2xl md:text-4xl font-semibold">You Don't Add any House Yet</h2>
            <Link to="/dashboard/addhouse" className="mt-5 px-4 py-2 bg-yellow-800 text-white text-xl font-semibold rounded-md hover:bg-yellow-500">Add New House</Link>
         </div>
      </>
   );
};

export default EmptyRoom;
import OwnerDashboard from "../../../components/Dashboard/HouseOwner/OwnerDashboard";
import RenterDashboard from "../../../components/Dashboard/HouseRenter/RenterDashboard";
import useAuth from "../../../hooks/useAuth";

const DashboardHome = () => {
   const { user } = useAuth()

   return (
      <>
         {user?.role === 'owner' && <OwnerDashboard />}
         {user?.role === 'renter' && <RenterDashboard />}
      </>
   );
};

export default DashboardHome;
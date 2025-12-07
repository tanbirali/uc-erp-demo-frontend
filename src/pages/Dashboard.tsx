import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl">Welcome to the Dashboard</h1>
        <div className="flex flex-col gap-4 p-6">
          <p className="text-xl">User: {user?.first_name}</p>
          <p className="text-xl">Email: {user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

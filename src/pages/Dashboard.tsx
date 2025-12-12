import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const complexGradientStyle = {
    backgroundImage: `
      linear-gradient(transparent, white), 
      radial-gradient(at center top, rgb(21, 94, 117) 0%, rgb(45, 212, 191) 60%, rgb(255, 255, 255) 100%)
    `,
  };
  if (!user) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{ ...complexGradientStyle }}
      >
        <h1 className="text-3xl">You are not logged in.</h1>
        <p className="text-xl">Please log in to access the dashboard.</p>
      </div>
    );
  }
  return (
    <div>
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{ ...complexGradientStyle }}
      >
        <h1 className="text-3xl">Welcome to the Dashboard</h1>
        <div className="flex flex-col gap-4 p-6">
          <p className="text-xl">User: {user?.first_name}</p>
          <p className="text-xl">Email: {user?.email}</p>
        </div>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 hover:cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

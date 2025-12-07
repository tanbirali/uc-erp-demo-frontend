import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompanyRegister from "./pages/CompanyRegister";
import BranchRegister from "./pages/BranchRegister";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/onboarding/company/register"
              element={<CompanyRegister />}
            />
            <Route
              path="/onboarding/branch/register"
              element={<BranchRegister />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
                  <h1 className="text-3xl font-semibold">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

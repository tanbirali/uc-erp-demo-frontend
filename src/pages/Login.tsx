import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data: any) => {
    if (!data.username || !data.password) {
      console.error("Username and password are required");
      return;
    }
    if (data.password.length < 8) {
      console.error("Password must be at least 8 characters long");
      return;
    }
    const response = await login(data.username, data.password);
    console.log(response);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div
        className="flex flex-col justify-center items-center h-full border rounded-2xl border-gray-300 
      p-8 bg-white shadow-md"
      >
        <h1 className="text-3xl font-semibold mb-6">Login Page</h1>
        <form
          className="flex flex-col gap-4 w-80"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            {...register("username", { required: true })}
            placeholder="Username"
            className="p-2 border border-gray-300 rounded outline-none w-full"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <label htmlFor="password">Password:</label>
          <div className="flex items-center w-full border border-gray-300 rounded">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              className="p-2  w-full outline-none"
            />
            <button onClick={togglePasswordVisibility} className="px-2">
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="my-4 flex items-center justify-center ">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

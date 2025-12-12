import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    // You should use react-hook-form's built-in validation for better user experience
    // but keeping the current console errors for structure clarity.
    if (!data.username || !data.password) {
      console.error("Username and password are required");
      return;
    }
    if (data.password.length < 8) {
      console.error("Password must be at least 8 characters long");
      return;
    }
    try {
      // Assuming 'login' is a mock or an actual async function
      await login(data.username, data.password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      // **TODO: Add user-facing error state here (e.g., using a state variable)**
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent button from submitting the form
    setShowPassword(!showPassword);
  };
  const complexGradientStyle = {
    backgroundImage: `
      linear-gradient(transparent, white), 
      radial-gradient(at center top, rgb(21, 94, 117) 0%, rgb(45, 212, 191) 60%, rgb(255, 255, 255) 100%)
    `,
  };
  return (
    // 1. Responsive Background and Centering
    <div
      className="min-h-screen w-full flex justify-center items-center p-4"
      style={{
        ...complexGradientStyle,
      }}
    >
      {/* 2. Responsive Card Container */}
      <div
        className="w-full max-w-sm md:max-w-md lg:max-w-lg
                      bg-white/90 backdrop-blur-sm p-8 rounded-2xl 
                      shadow-2xl border border-gray-200 transform transition-all 
                      duration-500 hover:shadow-3xl"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800">
          Welcome Back!
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address:
            </label>
            <input
              id="username"
              type="email"
              {...register("username", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="your.email@example.com"
              className="p-3 border border-gray-300 rounded-lg outline-none w-full 
                                  focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {"Username is required"}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password:
            </label>
            <div
              className="flex items-center w-full border border-gray-300 rounded-lg 
                                    focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 
                                    transition duration-150"
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="••••••••"
                className="p-3 w-full outline-none bg-transparent"
              />
              <button
                type="button" // Important: set to type="button" to prevent form submission
                onClick={togglePasswordVisibility}
                className="px-3 text-gray-500 hover:text-gray-700 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {"Password is required"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white p-3 rounded-lg font-semibold 
                              hover:bg-blue-700 transition duration-150 ease-in-out 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition duration-150"
            >
              Register here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

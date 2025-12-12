import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Note: Using a different random image query for variety
const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch, // Use watch to read form values for conditional validation
    formState: { errors },
  } = useForm();

  // Watch the password field for comparison in confirm password validation
  const password = watch("password", "");

  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  // State for user-facing registration error
  const [registrationError, setRegistrationError] = useState("");

  const onSubmit = async (data: any) => {
    // Note: Most of these checks are now handled more cleanly by react-hook-form validation
    setRegistrationError(""); // Clear previous errors
    console.log(data);

    try {
      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.confirmPassword);

      console.log("Form Data Prepared");

      // Removed FormData console log for cleaner production code, but keeping it for debugging clarity:
      // for (let pair of formData.entries()) { console.log(`${pair[0]}: ${pair[1]}`); }

      await registerUser(formData);

      navigate("/onboarding/company/register");
    } catch (error) {
      console.error("Registration failed", error);
      // Set a generic user-facing error message
      setRegistrationError(
        "Registration failed. Please check your details and try again."
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (
    e: React.MouseEvent<HTMLButtonElement>,
    field: string
  ) => {
    e.preventDefault(); // Prevent button from submitting the form
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    // 1. Responsive Background and Centering
    <div
      className="min-h-screen w-full flex justify-center items-center p-4"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 2. Responsive Card Container */}
      <div
        className="w-full max-w-lg md:max-w-xl
                   bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl 
                   shadow-2xl border border-gray-200"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800">
          Create Your Account
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* First Name & Last Name (Responsive Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name:
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
                placeholder="First Name"
                className="p-3 border border-gray-300 rounded-lg outline-none w-full 
                          focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {"First Name is required"}
                </p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name:
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
                placeholder="Last Name"
                className="p-3 border border-gray-300 rounded-lg outline-none w-full 
                          focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {"Last Name is required"}
                </p>
              )}
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="you@company.com"
              className="p-3 border border-gray-300 rounded-lg outline-none w-full 
                        focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{"Email is required"}</p>
            )}
          </div>

          {/* Gender Select */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender (Optional):
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="p-3 border border-gray-300 rounded-lg outline-none w-full bg-white
                        focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password & Confirm Password (Responsive Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password */}
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
                  type="button"
                  onClick={(e) => togglePasswordVisibility(e, "password")}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password:
              </label>
              <div
                className="flex items-center w-full border border-gray-300 rounded-lg 
                            focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 
                            transition duration-150"
              >
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match", // Client-side validation
                  })}
                  placeholder="••••••••"
                  className="p-3 w-full outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={(e) =>
                    togglePasswordVisibility(e, "confirmPassword")
                  }
                  className="px-3 text-gray-500 hover:text-gray-700 transition"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {"Please confirm your password"}
                </p>
              )}
            </div>
          </div>

          {/* Registration Error Display */}
          {registrationError && (
            <p className="text-red-600 font-medium text-center bg-red-50 p-3 rounded-lg">
              {registrationError}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white p-3 rounded-lg font-semibold 
                      hover:bg-green-700 transition duration-150 ease-in-out 
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Register Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition duration-150"
            >
              Login here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

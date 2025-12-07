import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: registerUser } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (data.password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      const formData = new FormData();
      formData.append("first_name", data.firstName);
      formData.append("last_name", data.lastName);
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.confirmPassword);
      console.log("Form Data Prepared");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      await registerUser(formData);
      // Redirect to dashboard or another page after successful registration
      navigate("/onboarding/company/register");
    } catch (error) {
      console.error(error);
      throw new Error("Registration failed");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div
        className="flex flex-col justify-center items-center h-full border rounded-2xl border-gray-300 
                   p-4 md:p-8 bg-white shadow-md"
      >
        <h1 className="text-3xl font-semibold mb-6">Register Page</h1>
        <form
          className="flex flex-col gap-4 w-80 px-4 md:px-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-4 md:flex-row md:gap-5">
            <div className="gap-2 flex flex-col">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="p-2 border border-gray-300 rounded outline-none w-full"
              />
              {errors.firstName && (
                <p className="text-red-500">First Name is required</p>
              )}
            </div>
            <div className="gap-2 flex flex-col">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
                className="p-2 border border-gray-300 rounded outline-none w-full"
              />
              {errors.lastName && (
                <p className="text-red-500">Last Name is required</p>
              )}
            </div>
          </div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded outline-none w-full"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <label htmlFor="gender">Gender:</label>
          <select
            {...register("gender", { required: false })}
            className="p-2 border border-gray-300 rounded outline-none w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500">Gender is not selected</p>
          )}
          <div className="flex flex-col md:flex-row md:items-center md:gap-5 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password:</label>
              <div className="flex items-center w-full border border-gray-300 rounded">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="p-2  w-full outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="px-2"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Confirm Password:</label>
              <div className="flex items-center w-full border border-gray-300 rounded">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confirm Password"
                  className="p-2  w-full outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="px-2"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="my-4 flex items-center justify-center ">
          <p>
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

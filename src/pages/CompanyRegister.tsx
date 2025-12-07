import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { registerCompany } from "../api/onboarding";
import { useNavigate } from "react-router";
const CompanyRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { user, token } = useAuth();
  const onSubmit = async (data: any) => {
    console.log(data);
    console.log("User:", user);
    console.log("Token:", token);
    const userId = user?.id || "";
    console.log("User ID:", userId);
    // You can call your API function here to register the company
    const response = await registerCompany(
      data.organisationName,
      userId,
      token || ""
    );
    console.log("Company registration response:", response);
    if (response.msg === "success") {
      navigate("/onboarding/branch/register");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div
        className="flex flex-col justify-center items-center h-full border rounded-2xl border-gray-300 
      p-8 bg-white shadow-md md:min-w-2xl"
      >
        <h1>Tell use about your company</h1>
        <div className="gap-4 my-4 flex flex-col w-full ">
          <label htmlFor="organisationName">Organisation Name</label>
          <input
            type="text"
            placeholder="Organisation Name"
            className="p-2 border border-gray-300 rounded outline-none w-full"
            {...register("organisationName", { required: true })}
          />
          {errors.organisationName && (
            <p className="text-red-500">Organisation Name is required</p>
          )}
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;

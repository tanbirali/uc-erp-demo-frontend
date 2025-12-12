import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { registerCompany } from "../api/onboarding"; // Assuming this path is correct
import { useNavigate } from "react-router";
import { BriefcaseBusiness } from "lucide-react"; // A relevant icon
import { useState } from "react";

// Note: Using an image related to business or work setup

const CompanyRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  // Assuming user and token are available in the AuthContext
  const { user, token, storeCompanyId } = useAuth();

  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setSubmissionError(null);

    // Gracefully handle missing user/token if necessary, though ideally this page is protected.
    const userId = user?.id;
    const authToken = token;

    if (!userId || !authToken) {
      setSubmissionError("Authentication failed. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await registerCompany(
        data.organisationName,
        userId,
        authToken
      );
      if (storeCompanyId) {
        storeCompanyId(response.result[0].company_id); // Store company name in context if needed
      }

      console.log("Company registration response:", response);

      // Check the response from your API
      if (response && response.msg === "success") {
        navigate("/onboarding/branch/register");
      } else {
        // Handle API-specific errors
        setSubmissionError(
          response?.message || "Failed to register company. Please try again."
        );
      }
    } catch (error) {
      console.error("Company registration error:", error);
      setSubmissionError("A network error occurred. Check your connection.");
    } finally {
      setLoading(false);
    }
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
      className="min-h-screen w-full flex justify-center items-center p-4 "
      style={{
        ...complexGradientStyle,
      }}
    >
      {/* 2. Responsive Card Container */}
      <div
        className="w-full max-w-md 
                   bg-white/95 backdrop-blur-sm p-8 rounded-2xl 
                   shadow-2xl border border-gray-200"
      >
        {/* Header and Onboarding Step Indicator */}
        <div className="flex flex-col items-center mb-8 text-center">
          <BriefcaseBusiness className="h-10 w-10 text-blue-600 mb-3" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Setup Your Company
          </h1>
          <p className="text-gray-500 mt-2">
            Step 1 of 2: Provide the name of your organization.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          {/* Input Field */}
          <div>
            <label
              htmlFor="organisationName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Organization Name:
            </label>
            <input
              id="organisationName"
              type="text"
              placeholder="E.g., Global Solutions Inc."
              className="p-3 border border-gray-300 rounded-lg outline-none w-full 
                              focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              {...register("organisationName", {
                required: "Organization Name is required",
              })}
            />
            {errors.organisationName && (
              <p className="text-red-500 text-sm mt-1">
                {"Company Name is required"}
              </p>
            )}
          </div>

          {/* Error Message */}
          {submissionError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{submissionError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-semibold transition duration-150 ease-in-out 
                            focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${
                              loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Next: Register Branch"}
          </button>

          {/* Optional: Go Back Link */}
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Go back to user registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegister;

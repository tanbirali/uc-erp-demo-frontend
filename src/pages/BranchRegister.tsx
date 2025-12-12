import { useState } from "react";
// Import necessary types from react-hook-form
import { useForm } from "react-hook-form";
import { MapPin, Settings } from "lucide-react";
import { useNavigate } from "react-router";
import { registerBranch } from "../api/onboarding";
import { useAuth } from "../context/AuthContext";

// --- TYPE DEFINITIONS ---
type BranchFormData = {
  organisationName: string;
  industry: string;
  state: string;
  buildingNumber: string;
  address: string;
  zipCode: string;
  district: string;
  city: string;
  currency: string;
  language: string;
  timezone: string;
  // These fields are optional in the form, but need to be included in the type
  vatNumber?: string;
  taxRegisteredNumber?: string;
};

// Internal Props interface for the InputField (it will use closure for register and errors)
interface InputFieldInternalProps {
  id: keyof BranchFormData; // Ensures id is one of the keys in the form data
  label: string;
  placeholder: string;
  type?: "text" | "select" | "number" | "email"; // Enforce valid HTML/select types
  requiredMessage?: string;
  options?: any;
}

const BranchRegister = () => {
  // Apply the type definition to useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    unregister,
  } = useForm<BranchFormData>();

  const navigate = useNavigate();
  const [isVatRegistered, setIsVatRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null); // Retrieve token and companyId from AuthContext

  const { token, companyId } = useAuth(); // --- Conditional VAT/Tax Logic ---

  const handleVatToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsVatRegistered(isChecked);

    if (!isChecked) {
      unregister("vatNumber");
      unregister("taxRegisteredNumber");
    }
  }; // --- Submission Logic (Now correctly typed) ---

  const onSubmit = async (data: BranchFormData) => {
    setLoading(true);
    setSubmissionError(null);

    // Guard Clause for missing required auth data
    if (!companyId || !token) {
      setSubmissionError(
        "Authentication error: Missing Company ID or Token. Please log in."
      );
      setLoading(false);
      return;
    }

    try {
      const payload = {
        company_id: companyId, // Used the stored companyId
        name: data.organisationName,
        industry: data.industry,
        state: data.state,
        building_number: data.buildingNumber,
        street: data.address,
        zip_code: data.zipCode,
        district: data.district,
        city: data.city,
        currency: data.currency,
        language: data.language,
        time_zone: data.timezone,
        is_vat_registered: isVatRegistered, // Conditional data handling: ensure non-required fields are only sent if toggled
        tax_registration_number: isVatRegistered
          ? data.taxRegisteredNumber || ""
          : "",
        vat_registered_number: isVatRegistered ? data.vatNumber || "" : "",
      };

      const response = await registerBranch(payload, token);
      console.log("Branch registration response:", response);

      // Check for success based on typical API response structure
      if (response && response.msg === "success") {
        navigate("/dashboard");
      } else {
        setSubmissionError(
          response?.message ||
            "Branch registration failed due to an unknown API error."
        );
      }
    } catch (error: any) {
      console.error("Branch registration failed:", error);
      setSubmissionError(
        error.message || "A network error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }; // Function to render a styled input field (using closure for register/errors)

  const InputField: React.FC<InputFieldInternalProps> = ({
    id,
    label,
    placeholder,
    type = "text",
    requiredMessage,
    options = {},
  }) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          className="p-3 border border-gray-300 rounded-lg outline-none w-full bg-white
         focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          // Register function from the outer scope is used here (closure)
          {...register(id, {
            required: requiredMessage ? requiredMessage : false,
            ...options,
          })}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.selectOptions.map(
            (option: { value: string; label: string }) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="p-3 border border-gray-300 rounded-lg outline-none w-full 
          focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          // Register function from the outer scope is used here (closure)
          {...register(id, {
            required: requiredMessage ? requiredMessage : false,
            ...options,
          })}
        />
      )}
           {" "}
      {errors[id] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[id]?.message?.toString() ||
            requiredMessage ||
            "This field is required."}
        </p>
      )}
    </div>
  );
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
      style={{ ...complexGradientStyle }}
    >
      {/* 2. Responsive Card Container */}{" "}
      <div
        className="w-full max-w-4xl bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-2xl 
              shadow-2xl border border-gray-200"
      >
        {/* Header and Onboarding Step Indicator */}{" "}
        <div className="flex flex-col items-center mb-10 text-center">
          <MapPin className="h-10 w-10 text-green-600 mb-3" />{" "}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Register Your First Branch{" "}
          </h1>
                   {" "}
          <p className="text-gray-500 mt-2 text-lg">
                        Step 2 of 2: Provide the core details and location.    
                 {" "}
          </p>
                 {" "}
        </div>
               {" "}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full"
        >
          {/* --- Section 1: General & Location --- */}{" "}
          <div className="border-b pb-6 border-gray-200">
            {" "}
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" /> Branch Details &
              Address{" "}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Organisation Name */}
              <InputField
                id="organisationName"
                label="Branch/Location Name"
                placeholder="Headquarters"
                requiredMessage="Branch Name is required"
              />
              {/* Industry */}{" "}
              <InputField
                id="industry"
                label="Industry"
                type="select"
                placeholder="Select Industry"
                requiredMessage="Industry is required"
                options={{
                  selectOptions: [
                    { value: "technology", label: "Technology" },
                    { value: "finance", label: "Finance" },
                    { value: "healthcare", label: "Healthcare" },
                    { value: "retail", label: "Retail" },
                  ],
                }}
              />
              {/* Building Number */}{" "}
              <InputField
                id="buildingNumber"
                label="Building/Unit Number"
                placeholder="Unit 101"
                requiredMessage="Building Number is required"
              />
              {/* Street */}{" "}
              <InputField
                id="address"
                label="Street Address"
                placeholder="123 Main Street"
                requiredMessage="Street is required"
              />
              {/* City */}{" "}
              <InputField
                id="city"
                label="City"
                placeholder="City Name"
                requiredMessage="City is required"
              />
              {/* District */}{" "}
              <InputField
                id="district"
                label="District/Area"
                placeholder="Downtown"
                requiredMessage="District is required"
              />
              {/* State */}{" "}
              <InputField
                id="state"
                label="State/Province"
                type="select"
                placeholder="Select State"
                requiredMessage="State is required"
                options={{
                  selectOptions: [
                    { value: "california", label: "California" },
                    { value: "texas", label: "Texas" },
                    { value: "new_york", label: "New York" },
                    { value: "florida", label: "Florida" },
                  ],
                }}
              />
              {/* Zip Code */}{" "}
              <InputField
                id="zipCode"
                label="Zip/Postal Code"
                placeholder="10001"
                requiredMessage="Zip Code is required"
              />
            </div>
          </div>
          {/* --- Section 2: Settings & Preferences --- */}
          <div className="border-b pb-6 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" /> Settings{" "}
            </h2>{" "}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              {/* Time Zone */}
              <InputField
                id="timezone"
                label="Time Zone"
                type="select"
                placeholder="Select Time Zone"
                requiredMessage="Time Zone is required"
                options={{
                  selectOptions: [
                    { value: "gmt+5.5", label: "GMT+5:30 (India)" },
                    { value: "gmt-5", label: "GMT-5 (EST)" },
                    { value: "gmt+0", label: "GMT+0 (London)" },
                    { value: "gmt+3", label: "GMT+3" },
                  ],
                }}
              />
              {/* Currency */}
              <InputField
                id="currency"
                label="Default Currency"
                type="select"
                placeholder="Select Currency"
                requiredMessage="Currency is required"
                options={{
                  selectOptions: [
                    { value: "usd", label: "USD ($)" },
                    { value: "eur", label: "EUR (€)" },
                    { value: "gbp", label: "GBP (£)" },
                    { value: "inr", label: "INR (₹)" },
                  ],
                }}
              />
              {/* Language */}
              <InputField
                id="language"
                label="Default Language"
                type="select"
                placeholder="Select Language"
                requiredMessage="Language is required"
                options={{
                  selectOptions: [
                    { value: "english", label: "English" },
                    { value: "spanish", label: "Spanish" },
                    { value: "french", label: "French" },
                    { value: "german", label: "German" },
                  ],
                }}
              />{" "}
            </div>
          </div>
          {/* --- Section 3: VAT / Tax Registration (Conditional) --- */}
          <div className="flex flex-col gap-4">
            {" "}
            <div className="flex items-center">
              <input
                id="isVatRegistered"
                type="checkbox"
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={isVatRegistered}
                onChange={handleVatToggle}
              />

              <label
                htmlFor="isVatRegistered"
                className="ml-3 text-base font-medium text-gray-700"
              >
                Is your organization VAT/Tax Registered?
              </label>
            </div>
            {isVatRegistered && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 border border-blue-200 rounded-lg bg-blue-50 transition-all duration-300">
                {/* VAT Number */}
                <InputField
                  id="vatNumber"
                  label="VAT/Tax Number"
                  placeholder="Enter Tax ID"
                  requiredMessage="VAT/Tax Number is required"
                  options={{
                    required: "VAT/Tax Number is required",
                    onBlur: () => trigger("vatNumber"),
                  }}
                />
                {/* Tax Registered Number */}
                <InputField
                  id="taxRegisteredNumber"
                  label="Tax Registration Document ID"
                  placeholder="Enter document ID"
                  requiredMessage="Tax Registration ID is required"
                  options={{
                    required: "Tax Registration ID is required",
                    onBlur: () => trigger("taxRegisteredNumber"),
                  }}
                />
              </div>
            )}
          </div>
          {/* Submission Error Display */}
          {submissionError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline font-medium">
                Submission Failed:
              </span>{" "}
              {submissionError}
            </div>
          )}
                    {/* Submit Button */}         {" "}
          <button
            type="submit"
            className={`mt-4 w-full p-3 rounded-lg font-semibold transition duration-150 ease-in-out 
                       focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                      }`}
            disabled={loading}
          >
            {loading
              ? "Submitting Branch Details..."
              : "Finalize Setup & Continue"}
          </button>
          {/* Optional Back Button */}
          <div className="text-center mt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700 text-sm underline"
            >
              Go back to Company registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchRegister;

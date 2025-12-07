import { useState } from "react";
import { useForm } from "react-hook-form";
const BranchRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isVatRegistered, setIsVatRegistered] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-10">
      <div
        className="flex flex-col justify-center items-start h-full border rounded-2xl border-gray-300 
      p-8 bg-white shadow-md md:w-2xl"
      >
        <h1 className="text-center mx-auto text-xl font-bold">
          Setup your branch
        </h1>
        <div className="my-4 flex flex-col items-start w-full gap-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="organisationName">Organisation Name</label>
            <input
              type="text"
              placeholder="Organisation Name"
              className="p-2 border border-gray-300 rounded outline-none w-full  "
              {...register("organisationName", { required: true })}
            />
            {errors.organisationName && (
              <p className="text-red-500">Organisation Name is required</p>
            )}
          </div>
          <div className="gap-2 flex flex-col w-full md:flex-row items-center">
            <div className="flex flex-col gap-2 w-full ">
              <label htmlFor="industry">Industry</label>
              <select
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("industry", { required: true })}
              >
                <option value="">Select Industry</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail</option>
              </select>
              {errors.industry && (
                <p className="text-red-500">Industry is required</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <label htmlFor="buildingNumber">Building Number</label>
              <input
                type="text"
                placeholder="Building Number"
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("buildingNumber", { required: true })}
              />
              {errors.buildingNumber && (
                <p className="text-red-500">Building Number is required</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 md:flex-row items-center ">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="country">Time Zone</label>
              <select
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("timezone", { required: true })}
              >
                <option value="">Select Time Zone</option>
                <option value="gmt+3">GMT+3</option>
                <option value="gmt-5">GMT-5</option>
                <option value="gmt+0">GMT+0</option>
                <option value="gmt+10">GMT+10</option>
                <option value="gmt+5.5">GMT+5.5</option>
              </select>
              {errors.timezone && (
                <p className="text-red-500">Time Zone is required</p>
              )}
            </div>
            <div className="gap-4 w-full flex flex-col ">
              <label htmlFor="state">State</label>
              <select
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("state", { required: true })}
              >
                <option value="">Select State</option>
                <option value="california">California</option>
                <option value="texas">Texas</option>
                <option value="new_york">New York</option>
                <option value="florida">Florida</option>
                <option value="illinois">Illinois</option>
              </select>
              {errors.state && (
                <p className="text-red-500">State is required</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 md:flex-row items-center ">
            <div className="gap-4 w-full flex flex-col ">
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="City"
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("city", { required: true })}
              />
              {errors.city && <p className="text-red-500">City is required</p>}
            </div>
            <div className="w-full gap-4 flex flex-col">
              <label htmlFor="address">Street</label>
              <input
                type="text"
                placeholder="Street"
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <p className="text-red-500">Street is required</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 md:flex-row items-center ">
            <div className="gap-4 w-full flex flex-col ">
              <label htmlFor="city">District</label>
              <input
                type="text"
                placeholder="District"
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("district", { required: true })}
              />
              {errors.district && (
                <p className="text-red-500">District is required</p>
              )}
            </div>
            <div className="w-full gap-4 flex flex-col">
              <label htmlFor="address">Zip Code</label>
              <input
                type="text"
                placeholder="Zip Code"
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("zipCode", { required: true })}
              />
              {errors.zipCode && (
                <p className="text-red-500">Zip Code is required</p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 md:flex-row items-center ">
            <div className="gap-4 w-full flex flex-col ">
              <label htmlFor="currency">Currency</label>
              <select
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("currency", { required: true })}
              >
                <option value="">Select Currency</option>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="inr">INR</option>
                <option value="jpy">JPY</option>
              </select>
              {errors.currency && (
                <p className="text-red-500">Currency is required</p>
              )}
            </div>
            <div className="w-full gap-4 flex flex-col">
              <label htmlFor="language">Language</label>
              <select
                className="p-2 border border-gray-300 rounded outline-none w-full"
                {...register("language", { required: true })}
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
                <option value="arabic">Arabic</option>
              </select>
              {errors.language && (
                <p className="text-red-500">Language is required</p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={isVatRegistered}
                onChange={() => setIsVatRegistered(!isVatRegistered)}
              />
              <label htmlFor="vat">Vat Registered</label>
            </div>
            <div className="w-full flex  ">
              {isVatRegistered && (
                <div className="flex flex-col md:flex-row gap-2 w-full ">
                  <div className="flex flex-col gap-2 w-full ">
                    <label htmlFor="vatNumber">Vat Number</label>
                    <input
                      type="text"
                      placeholder="Vat Number"
                      className="p-2 border border-gray-300 rounded outline-none w-full"
                      {...register("vatNumber", { required: isVatRegistered })}
                    />
                    {errors.vatNumber && (
                      <p className="text-red-500">Vat Number is required</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full ">
                    <label htmlFor="taxPercentage">Tax Registered Number</label>
                    <input
                      type="text"
                      placeholder="Tax Registered Number"
                      className="p-2 border border-gray-300 rounded outline-none w-full"
                      {...register("taxRegisteredNumber", {
                        required: isVatRegistered,
                      })}
                    />
                    {errors.taxRegisteredNumber && (
                      <p className="text-red-500">
                        Tax Registered Number is required
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 hover:cursor-pointer mx-auto w-full "
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default BranchRegister;

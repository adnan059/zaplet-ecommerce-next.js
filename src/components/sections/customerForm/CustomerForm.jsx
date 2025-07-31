"use client";

import { useCustomerStore } from "@/store/useCustomerStore";
import React from "react";
import { useForm } from "react-hook-form";

const CustomerForm = () => {
  const { setCustomerDetails, customerDetails } = useCustomerStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    setCustomerDetails({ isSaved: true, ...data });
  };

  console.log(customerDetails);

  return (
    <div className="customerForm">
      <h2>Your Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        {/* ✅ Full Name */}
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            placeholder="Your Fullname"
            id="fullName"
            {...register("fullName", {
              required: "Full name is required.",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters.",
              },
            })}
          />
          {errors.fullName && (
            <p className="customerFormErrorMsg">{errors.fullName.message}</p>
          )}
        </div>

        {/* 📱 Phone Number */}
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            placeholder="Your Phone Number"
            id="phone"
            {...register("phone", {
              required: "Phone number is required.",
              pattern: {
                value: /^01[3-9]\d{8}$/,
                message: "Enter a valid Bangladeshi mobile number.",
              },
            })}
          />
          {errors.phone && (
            <p className="customerFormErrorMsg">{errors.phone.message}</p>
          )}
        </div>

        {/* 📍 Address */}
        <div>
          <label htmlFor="address">Address</label>
          <textarea
            placeholder="Your Address"
            id="address"
            {...register("address", {
              required: "Address is required.",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters.",
              },
            })}
          />
          {errors.address && (
            <p className="customerFormErrorMsg">{errors.address.message}</p>
          )}
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className={`customerFormButton ${
            customerDetails?.isSaved ? "saved" : ""
          }`}
        >
          {customerDetails?.isSaved ? "Saved" : "Save Details"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;

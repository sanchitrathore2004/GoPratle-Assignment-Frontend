"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};

const SETUP_REQUIREMENTS = [
  "Stage Setup",
  "Lighting",
  "Sound System",
  "Decoration",
  "Seating Arrangement",
  "Catering Setup",
  "Photography Setup",
  "Other",
] as const;

const schema = z.object({
  setupRequirements: z
    .array(z.enum(SETUP_REQUIREMENTS))
    .min(1, "Select at least one setup requirement"),
  breakdownRequired: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  vendorCoordination: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  specialRequests: z.string(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function PlannerAdditionalDetails({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      setupRequirements: [],
      specialRequests: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label className={labelClass}>
          Setup Requirements *
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SETUP_REQUIREMENTS.map((requirement) => (
            <label
              key={requirement}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-3 transition has-[:checked]:border-[#e02d4b] has-[:checked]:bg-rose-50"
            >
              <input
                type="checkbox"
                value={requirement}
                {...register("setupRequirements")}
                className="accent-[#e02d4b]"
              />
              <span className="text-sm text-gray-800">
                {requirement}
              </span>
            </label>
          ))}
        </div>
        {errors.setupRequirements && (
          <p className="mt-1 text-sm text-red-600">
            {errors.setupRequirements.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="breakdownRequired" className={labelClass}>
          Is Post-Event Setup Breakdown Required? *
        </label>
        <select
          id="breakdownRequired"
          {...register("breakdownRequired")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.breakdownRequired && (
          <p className="mt-1 text-sm text-red-600">
            {errors.breakdownRequired.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="vendorCoordination" className={labelClass}>
          Is Vendor Coordination Required? *
        </label>
        <select
          id="vendorCoordination"
          {...register("vendorCoordination")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.vendorCoordination && (
          <p className="mt-1 text-sm text-red-600">
            {errors.vendorCoordination.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="specialRequests" className={labelClass}>
          Special Requests (Optional)
        </label>
        <textarea
          id="specialRequests"
          rows={4}
          placeholder="Mention any additional arrangements or specific requirements"
          {...register("specialRequests")}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[#e02d4b] px-6 py-3.5 font-semibold text-white transition hover:bg-[#c9213e] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processing..." : "Continue"}
      </button>
    </form>
  );
}
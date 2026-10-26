"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};

const SERVICES = [
  "Full Event Planning",
  "Decoration",
  "Logistics",
  "Vendor Coordination",
  "Venue Management",
  "Catering Coordination",
] as const;

const PLANNING_STAGES = [
  "Just Starting",
  "Partially Planned",
  "Venue Booked",
  "Vendors Booked",
  "Need Complete Management",
] as const;

const schema = z.object({
  services: z.enum(SERVICES, {
    message: "Please select a service",
  }),
  guestCount: z.string().min(1, "Enter expected guest count"),
  budget: z.string().min(1, "Enter expected budget"),
  stage: z.enum(PLANNING_STAGES, {
    message: "Please select a planning stage",
  }),
  description: z
    .string()
    .min(50, "Enter at least 50 characters in the description"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function EventPlanner({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label htmlFor="services" className={labelClass}>
          Services Required *
        </label>
        <select
          id="services"
          {...register("services")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.services && (
          <p className="mt-1 text-sm text-red-600">
            {errors.services.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="guestCount" className={labelClass}>
          Expected Guest Count *
        </label>
        <input
          id="guestCount"
          type="number"
          min="1"
          placeholder="e.g. 500"
          {...register("guestCount")}
          className={inputClass}
        />
        {errors.guestCount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.guestCount.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Expected Budget (₹) *
        </label>
        <input
          id="budget"
          type="number"
          min="0"
          placeholder="e.g. 50000"
          {...register("budget")}
          className={inputClass}
        />
        {errors.budget && (
          <p className="mt-1 text-sm text-red-600">
            {errors.budget.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="stage" className={labelClass}>
          Planning Stage *
        </label>
        <select
          id="stage"
          {...register("stage")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select planning stage
          </option>
          {PLANNING_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
        {errors.stage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.stage.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description *
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Describe your event requirements"
          {...register("description")}
          className={inputClass}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
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
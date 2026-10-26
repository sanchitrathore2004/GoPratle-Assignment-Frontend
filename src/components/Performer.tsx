"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};

const PERFORMANCE_TYPES = [
  "Singer",
  "DJ",
  "Band",
  "Dancer",
  "Comedian",
  "Instrumentalist",
  "Other",
] as const;

const PERFORMANCE_DURATIONS = [
  "30 minutes",
  "1 hour",
  "2 hours",
  "3+ hours",
] as const;

const PERFORMANCE_MODES = ["Solo", "Group"] as const;

const schema = z.object({
  performanceType: z.enum(PERFORMANCE_TYPES, {
    message: "Please select a performance type",
  }),
  mode: z.enum(PERFORMANCE_MODES, {
    message: "Please select solo or group",
  }),
  duration: z.enum(PERFORMANCE_DURATIONS, {
    message: "Please select a performance duration",
  }),
  genre: z.string().min(2, "Enter at least 2 characters"),
  budget: z.string().min(1, "Enter your expected budget"),
  requirements: z.string(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function Performer({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      performanceType: undefined,
      mode: undefined,
      duration: undefined,
      genre: "",
      budget: "",
      requirements: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onNext)}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div>
        <label htmlFor="performanceType" className={labelClass}>
          Performance Type *
        </label>
        <select
          id="performanceType"
          {...register("performanceType")}
          className={inputClass}
        >
          <option value="">Select performance type</option>
          {PERFORMANCE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.performanceType && (
          <p className="mt-1 text-sm text-red-600">
            {errors.performanceType.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="mode" className={labelClass}>
          Solo or Group *
        </label>
        <select id="mode" {...register("mode")} className={inputClass}>
          <option value="">Select performance mode</option>
          {PERFORMANCE_MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
        {errors.mode && (
          <p className="mt-1 text-sm text-red-600">
            {errors.mode.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="duration" className={labelClass}>
          Performance Duration *
        </label>
        <select
          id="duration"
          {...register("duration")}
          className={inputClass}
        >
          <option value="">Select duration</option>
          {PERFORMANCE_DURATIONS.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">
            {errors.duration.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="genre" className={labelClass}>
          Genre / Specialty *
        </label>
        <input
          id="genre"
          type="text"
          placeholder="e.g. Pop, classical, rock, contemporary"
          {...register("genre")}
          className={inputClass}
        />
        {errors.genre && (
          <p className="mt-1 text-sm text-red-600">
            {errors.genre.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="budget" className={labelClass}>
          Expected Fee / Budget (₹) *
        </label>
        <input
          id="budget"
          type="number"
          min="0"
          placeholder="e.g. 25000"
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
        <label htmlFor="requirements" className={labelClass}>
          Special Requirements (Optional)
        </label>
        <textarea
          id="requirements"
          rows={4}
          placeholder="e.g. Sound system, instruments, stage setup"
          {...register("requirements")}
          className={inputClass}
        />
        {errors.requirements && (
          <p className="mt-1 text-sm text-red-600">
            {errors.requirements.message}
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
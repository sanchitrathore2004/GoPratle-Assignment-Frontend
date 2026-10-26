"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};

const CREW_ROLES = [
  "Sound Engineer",
  "Lighting Technician",
  "Photographer",
  "Videographer",
  "Security",
  "Stagehand",
  "Stage Manager",
  "Event Assistant",
  "Other",
] as const;

const EXPERIENCE_LEVELS = [
  "Beginner",
  "Intermediate",
  "Experienced",
  "Expert",
] as const;

const schema = z.object({
  role: z.enum(CREW_ROLES, {
    message: "Please select a crew role",
  }),
  memberCount: z.string().min(1, "Enter the number of crew members"),
  experience: z.enum(EXPERIENCE_LEVELS, {
    message: "Please select an experience level",
  }),
  workingHours: z.string().min(1, "Enter the expected working hours"),
  pay: z.string().min(1, "Enter the offered pay"),
  requirements: z.string(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function Crew({ onNext }: Props) {
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
        <label htmlFor="role" className={labelClass}>
          Crew Role *
        </label>
        <select
          id="role"
          {...register("role")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select crew role
          </option>
          {CREW_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">
            {errors.role.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="memberCount" className={labelClass}>
          Number of Crew Members *
        </label>
        <input
          id="memberCount"
          type="number"
          min="1"
          placeholder="e.g. 10"
          {...register("memberCount")}
          className={inputClass}
        />
        {errors.memberCount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.memberCount.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="experience" className={labelClass}>
          Required Experience Level *
        </label>
        <select
          id="experience"
          {...register("experience")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select experience level
          </option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">
            {errors.experience.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="workingHours" className={labelClass}>
          Expected Working Hours *
        </label>
        <input
          id="workingHours"
          type="text"
          placeholder="e.g. 9 AM to 6 PM or 8 hours"
          {...register("workingHours")}
          className={inputClass}
        />
        {errors.workingHours && (
          <p className="mt-1 text-sm text-red-600">
            {errors.workingHours.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="pay" className={labelClass}>
          Pay Offered (₹) *
        </label>
        <input
          id="pay"
          type="number"
          min="0"
          placeholder="e.g. 2000 per person"
          {...register("pay")}
          className={inputClass}
        />
        {errors.pay && (
          <p className="mt-1 text-sm text-red-600">
            {errors.pay.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="requirements" className={labelClass}>
          Required Skills / Equipment (Optional)
        </label>
        <textarea
          id="requirements"
          rows={4}
          placeholder="Describe required skills, tools, or equipment"
          {...register("requirements")}
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
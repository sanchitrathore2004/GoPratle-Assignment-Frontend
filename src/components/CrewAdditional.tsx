"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};

const REQUIRED_SKILLS = [
  "Communication",
  "Teamwork",
  "Technical Knowledge",
  "Problem Solving",
  "Equipment Handling",
  "Crowd Management",
  "First Aid",
  "Other",
] as const;

const EQUIPMENT_REQUIREMENTS = [
  "Tools Provided",
  "Must Bring Own Equipment",
  "Specialized Equipment Required",
  "No Equipment Needed",
] as const;

const DRESS_CODES = [
  "Formal",
  "Black T-Shirt and Trousers",
  "Uniform Provided",
  "Casual",
  "No Specific Dress Code",
] as const;

const schema = z.object({
  skills: z
    .array(z.enum(REQUIRED_SKILLS))
    .min(1, "Select at least one required skill"),
  equipment: z.enum(EQUIPMENT_REQUIREMENTS, {
    message: "Please select an equipment requirement",
  }),
  dressCode: z.enum(DRESS_CODES, {
    message: "Please select a dress code",
  }),
  specialRequests: z.string(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function CrewAdditionalDetails({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      skills: [],
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
          Required Skills *
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {REQUIRED_SKILLS.map((skill) => (
            <label
              key={skill}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-3 transition has-[:checked]:border-[#e02d4b] has-[:checked]:bg-rose-50"
            >
              <input
                type="checkbox"
                value={skill}
                {...register("skills")}
                className="accent-[#e02d4b]"
              />
              <span className="text-sm text-gray-800">{skill}</span>
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">
            {errors.skills.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="equipment" className={labelClass}>
          Equipment Requirements *
        </label>
        <select
          id="equipment"
          {...register("equipment")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select equipment requirements
          </option>
          {EQUIPMENT_REQUIREMENTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.equipment && (
          <p className="mt-1 text-sm text-red-600">
            {errors.equipment.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dressCode" className={labelClass}>
          Dress Code *
        </label>
        <select
          id="dressCode"
          {...register("dressCode")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select dress code
          </option>
          {DRESS_CODES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.dressCode && (
          <p className="mt-1 text-sm text-red-600">
            {errors.dressCode.message}
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
          placeholder="Mention any additional skills, tools, or safety requirements"
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
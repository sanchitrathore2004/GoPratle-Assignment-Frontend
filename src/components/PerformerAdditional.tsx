"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};

const EQUIPMENT_REQUIREMENTS = [
  "Sound System",
  "Microphone",
  "Musical Instruments",
  "Stage Lighting",
  "DJ Equipment",
  "Monitor Speakers",
  "Projector / Screen",
  "Other",
] as const;

const TRAVEL_REQUIREMENTS = [
  "No Accommodation Needed",
  "Accommodation Required",
  "Travel Reimbursement Required",
  "Both Accommodation and Travel",
] as const;

const schema = z.object({
  equipment: z
    .array(z.enum(EQUIPMENT_REQUIREMENTS))
    .min(1, "Select at least one equipment requirement"),
  stageSetup: z.enum(["Yes", "No"], {
    message: "Please select an option",
  }),
  travel: z.enum(TRAVEL_REQUIREMENTS, {
    message: "Please select a travel preference",
  }),
  specialRequests: z.string(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function PerformerAdditionalDetails({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      equipment: [],
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
          Equipment Requirements *
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {EQUIPMENT_REQUIREMENTS.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-3 transition has-[:checked]:border-[#e02d4b] has-[:checked]:bg-rose-50"
            >
              <input
                type="checkbox"
                value={item}
                {...register("equipment")}
                className="accent-[#e02d4b]"
              />
              <span className="text-sm text-gray-800">{item}</span>
            </label>
          ))}
        </div>
        {errors.equipment && (
          <p className="mt-1 text-sm text-red-600">
            {errors.equipment.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="stageSetup" className={labelClass}>
          Do You Require a Stage Setup? *
        </label>
        <select
          id="stageSetup"
          {...register("stageSetup")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        {errors.stageSetup && (
          <p className="mt-1 text-sm text-red-600">
            {errors.stageSetup.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="travel" className={labelClass}>
          Travel / Accommodation Requirements *
        </label>
        <select
          id="travel"
          {...register("travel")}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select your requirements
          </option>
          {TRAVEL_REQUIREMENTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.travel && (
          <p className="mt-1 text-sm text-red-600">
            {errors.travel.message}
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
          placeholder="Mention any additional technical or performance requirements"
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
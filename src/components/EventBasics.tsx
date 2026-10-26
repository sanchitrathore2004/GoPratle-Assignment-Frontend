"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  onNext: (data: FormData) => void;
};


const TYPES = ["Wedding", "Concert", "Corporate", "Festival"] as const;
const CATEGORIES = ["Event Planner", "Performer", "Crew"] as const;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#e02d4b] focus:ring-2 focus:ring-[#e02d4b]/20";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  type: z.enum(TYPES, {
    message: "Please select a valid event type",
  }),
  date: z.string().min(1, "Please select an event date"),
  endDate: z.string(),
  location: z.string().trim().min(2, "Please enter a location"),
  venue: z.string(),
  category: z.enum(CATEGORIES, {
    message: "Please select a category",
  }),
}).refine(
  (data) => !data.endDate || data.endDate >= data.date,
  {
    message: "End date cannot be before the event date",
    path: ["endDate"],
  }
);

type FormData = z.infer<typeof schema>;



export default function EventBasics({ onNext }: Props) {
      const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: undefined,
      date: "",
      endDate: "",
      location: "",
      venue: "",
      category: undefined,
    },
  });

  const eventDate = watch("date");

  return (
      <form
          onSubmit={handleSubmit(onNext)}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="name" className={labelClass}>
              Event Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Summer Music Festival"
              {...register("name")}
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="type" className={labelClass}>
              Event Type *
            </label>
            <select
              id="type"
              {...register("type")}
              className={inputClass}
            >
              <option value="">Select event type</option>
              {TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">
                {errors.type.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className={labelClass}>
                Start Date *
              </label>
              <input
                id="date"
                type="date"
                {...register("date")}
                className={inputClass}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="endDate" className={labelClass}>
                End Date (Optional)
              </label>
              <input
                id="endDate"
                type="date"
                min={eventDate || undefined}
                {...register("endDate")}
                className={inputClass}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>
              Location / City *
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Chennai, Tamil Nadu"
              {...register("location")}
              className={inputClass}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="venue" className={labelClass}>
              Venue (Optional)
            </label>
            <input
              id="venue"
              type="text"
              placeholder="e.g. Convention Centre"
              {...register("venue")}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              What are you looking for? *
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4 transition has-[:checked]:border-[#e02d4b] has-[:checked]:bg-rose-50"
                >
                  <input
                    type="radio"
                    value={category}
                    {...register("category")}
                    className="accent-[#e02d4b]"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {category}
                  </span>
                </label>
              ))}
            </div>

            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
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
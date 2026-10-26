type Props = {
  data: any;
  handleSubmit: () => void;
};

export default function ReviewAndSave({ data, handleSubmit }: Props) {
  const formatLabel = (key: string) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());

  const formatValue = (value: any): string => {
    if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
    if (value === null || value === undefined || value === "") return "Not provided";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  return (
    <div className="space-y-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review Your Event</h2>
        <p className="mt-2 text-sm">
          Review the details below before submitting your requirements.
        </p>
      </div>

      {Object.keys(data).length === 0 ? (
        <p className="text-sm text-gray-500">No event details available.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col gap-1 border-b border-gray-100 pb-4 sm:flex-row sm:justify-between sm:gap-6"
            >
              <p className="text-sm font-medium text-gray-600">
                {formatLabel(key)}
              </p>
              <p className="break-words text-sm font-semibold text-gray-900 sm:max-w-[60%] sm:text-right">
                {formatValue(value)}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-xl p-4">
        <p className="text-sm">
          Please ensure all information is accurate before saving your event
          requirements.
        </p>
      </div>

      <button
      onClick={handleSubmit}
        type="submit"
        className="w-full rounded-lg bg-[#e02d4b] px-6 py-3 font-semibold text-white transition hover:bg-[#c92340] focus:outline-none focus:ring-2 focus:ring-[#e02d4b] focus:ring-offset-2"
      >
        Submit Requirements
      </button>
    </div>
  );
}
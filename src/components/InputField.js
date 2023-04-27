export const InputField = ({
  value,
  setValue,
  title,
  error,
  resetError,
  obscure,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="ml-1 font-semibold text-fact-text-medium">{title}</p>
      <input
        type={obscure ? "password" : "text"}
        value={value}
        onChange={(e) => {
          if (error != null) {
            resetError();
          }
          setValue(e.target.value);
        }}
        className="bg-white rounded-2xl focus:outline-1 outline-blue-400 py-2 px-4 special-shadow"
        style={{
          border: error != null ? "2px solid red" : "none",
        }}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};

export const InputFieldMultiline = ({
  value,
  setValue,
  title,
  error,
  resetError,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="ml-1 font-semibold text-fact-text-medium">{title}</p>
      <textarea
        value={value}
        onChange={(e) => {
          if (error != null) {
            resetError();
          }
          setValue(e.target.value);
        }}
        className="bg-white rounded-2xl focus:outline-1 outline-blue-400 py-2 px-4 special-shadow"
        style={{
          border: error != null ? "2px solid red" : "none",
        }}
      />
      <p className="text-red-500">{error}</p>
    </div>
  );
};

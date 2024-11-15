export type InputFieldProps = {
  value: string;
  setValue: Function;
  title: string;
  error: string;
  resetError: Function;
  obscure?: boolean;
  testId: string;
  bgColor: string;
};

/**
 * @param value - InputField Value
 * @param setValue - Callback used to update value change
 * @param title - Title over input field
 * @param error - If error string is passed, error message is shown
 * @param resetError - Callback that removes error message
 * @param obscure - Boolean deciding wether or not input is obscured; important for sensitive info
 * @param testId - Test ID
 *
 * @returns Simple Styled InputField facilitating custom error messages
 */
export const InputField = ({
  value,
  setValue,
  title,
  error,
  resetError,
  obscure,
  testId,
  bgColor,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={title} className="ml-1 font-semibold">
        {title}
      </label>
      <input
        id={title}
        data-testid={testId}
        type={obscure ? "password" : "text"}
        value={value}
        onChange={(e) => {
          if (error != null) {
            resetError();
          }
          setValue(e.target.value);
        }}
        className={`${bgColor} rounded-2xl focus:outline-1 outline-blue-400 py-2 px-4 special-shadow`}
        style={{
          border: error != null ? "2px solid red" : "none",
        }}
      />
      <label
        htmlFor={title}
        className="text-red-500"
        data-testid={testId + "-error"}
      >
        {error}
      </label>
    </div>
  );
};

/**
 * Multiline Styled InputField facilitating custom error messages
 *
 * @param testId - Test ID
 * @param value - InputField Value
 * @param setValue - Callback used to update value change
 * @param title - Title over input field
 * @param error - If error string is passed, error message is shown
 * @param resetError - Callback that removes error message
 *
 * @returns InputFieldMultiline
 */
export const InputFieldMultiline = ({
  testId,
  value,
  setValue,
  title,
  error,
  resetError,
  bgColor,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={title} className="ml-1 font-semibold">
        {title}
      </label>
      <textarea
        id={title}
        data-testid={testId}
        value={value}
        onChange={(e) => {
          if (error != null) {
            resetError();
          }
          setValue(e.target.value);
        }}
        className={`${bgColor} rounded-2xl focus:outline-1 outline-blue-400 py-2 px-4 special-shadow`}
        style={{
          border: error != null ? "2px solid red" : "none",
        }}
      />
      <label htmlFor={title} className="text-red-500">
        {error}
      </label>
    </div>
  );
};

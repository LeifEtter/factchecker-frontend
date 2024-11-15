/**
 * Loading Indicator Widget
 *
 * @returns Widget that shows animated Loading Dots
 */

export const LoadingDots = () => (
  <div className="flex flex-row gap-2 mt-10" id="loading-dots">
    <span className="sr-only">Loading...</span>
    <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="h-2 w-2 bg-gray-600 rounded-full animate-bounce"></div>
  </div>
);

interface ShowAllTogglerProps {
  showingAll: boolean;
  setShowingAll: Function;
}

export const ShowAllToggler = ({
  showingAll,
  setShowingAll,
}: ShowAllTogglerProps) => {
  return showingAll ? (
    <button
      onClick={() => setShowingAll(false)}
      className="text-blue-600 text-xs font-medium"
    >
      Hide
    </button>
  ) : (
    <button
      onClick={() => setShowingAll(true)}
      className="text-blue-600 text-xs font-medium"
    >
      Show All
    </button>
  );
};

type LoadingScreenProps = {
  loadedCount: number;
  totalCount: number;
  loadingMessage?: string;
  spinnerSize?: number;
};

const LoadingScreen = ({
  loadedCount,
  totalCount,
  loadingMessage = 'טוען תמונות',
  spinnerSize = 64,
}: LoadingScreenProps) => {
  const spinnerStyle = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    borderWidth: `${spinnerSize / 8}px`,
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
          style={spinnerStyle}
        />
        <p className="text-gray-700 text-lg font-medium" aria-live="polite">
          {loadingMessage} ({loadedCount}/{totalCount})
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;

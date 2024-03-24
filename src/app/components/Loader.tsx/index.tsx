const Loader = () => {
  return (
    <div role="status">
      <div className="flex justify-center rounded-2xl min-h-[29rem] items-center bg-gray-900 opacity-0 transition-opacity duration-500 opacity-100">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[red] rounded-full animate-spin"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;

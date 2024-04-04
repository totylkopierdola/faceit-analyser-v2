const Loader = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className=" z-10  "></div>
      <div className="absolute left-1/2 top-[calc(50vh-4rem)] w-12 h-12 border-4 border-gray-300 border-t-[red] rounded-full animate-spin z-50"></div>
    </div>
  );
};

export default Loader;

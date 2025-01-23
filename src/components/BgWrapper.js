function BgWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative grid grid-cols-[38rem] content-center justify-center ">
        <div className="absolute inset-0 bg-white opacity-40 -z-10 rounded-lg"></div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

export default BgWrapper;

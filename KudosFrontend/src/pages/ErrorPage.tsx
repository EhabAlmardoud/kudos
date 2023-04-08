const ErrorPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-y-2">
      <div className="text-xl">Ops!</div>
      <div className="text-lg font-bold">Page not found!</div>
      <div className="text-lg font-bold">404</div>
    </div>
  );
};

export default ErrorPage;

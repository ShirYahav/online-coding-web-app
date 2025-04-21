import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Link
        to="/"
        className="absolute top-4 left-6 text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </Link>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-muted-foreground">Page not found</p>
      </div>
    </>
  );
};

export default NotFound;

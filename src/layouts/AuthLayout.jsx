import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

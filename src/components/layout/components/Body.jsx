import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <>
      <div className="h-full">
       <Outlet />
      </div>
    </>
  );
};

export default Body;

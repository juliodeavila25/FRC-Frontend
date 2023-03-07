import React from "react";

export const Errors = ({ msg }) => {
  console.log(msg);
  return <span className="inline-flex text-sm text-red-700">{msg}</span>;
};

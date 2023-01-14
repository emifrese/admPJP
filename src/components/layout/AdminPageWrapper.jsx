import React from "react";

const AdminPageWrapper = ({ children }) => {
  return (
    <div className="flex justify-center flex-wrap items-start content-start h-full">
      {children}
    </div>
  );
};

export default AdminPageWrapper;

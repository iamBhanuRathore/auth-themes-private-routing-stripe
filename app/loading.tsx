import React from "react";

const loading = () => {
  return (
    <div className="w-full grid place-items-center py-20">
      <div className="h-10 w-10 rounded-full border-y-2 animate-spin border-secondary-1"></div>
    </div>
  );
};

export default loading;

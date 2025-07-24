import React from "react";

const Loader = () => (
  <div className="text-center text-gray-500 py-10">
    <div className="flex justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
    </div>
    <span className="animate-pulse">Loading articles...</span>
  </div>
);

export default React.memo(Loader);

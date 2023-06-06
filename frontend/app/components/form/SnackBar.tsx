import React from "react";

const SnackBar = ({
  children,
  isHidden,
  isAbsolute,
}: {
  children: React.ReactNode;
  isAbsolute: boolean;
  isHidden: boolean;
}) => {
  return (
    <div
      className={`p-4 flex justify-center items-center bg-purple-100 border-2 border-purple-500 w-full rounded-md mb-4 ${
        isAbsolute ? "absolute" : ""
      } ${isHidden ? "hidden" : ""}`}
    >
      {children}
    </div>
  );
};

export default SnackBar;

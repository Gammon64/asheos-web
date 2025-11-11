import React from "react";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md ${props.className}`}
    />
  );
};

export default Input;

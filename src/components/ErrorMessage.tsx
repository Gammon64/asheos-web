import React from "react";

const ErrorMessage = (
  props: React.ParamHTMLAttributes<HTMLParagraphElement>
) => {
  return (
    <p
      {...props}
      className={`text-red-500 text-sm mb-4 p-2 bg-red-100 border border-red-400  ${props.className}`}
    >
      {props.children}
    </p>
  );
};

export default ErrorMessage;

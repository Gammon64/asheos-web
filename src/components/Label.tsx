import React from "react";

const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      {...props}
      className={`block text-sm font- text-gray-700 dark:text-gray-300 mb-1 ${props.className}`}
    >
      {props.children}
    </label>
  );
};

export default Label;

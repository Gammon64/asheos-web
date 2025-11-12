import React from "react";

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      {...props}
      className={`w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md ${props.className}`}
    />
  );
};

export default Textarea;

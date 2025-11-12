import React from "react";

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className={`p-2 border border-gray-300 dark:border-gray-700 bg-zinc-50 dark:bg-zinc-950 rounded-md ${props.className}`}
    />
  );
};

export default Select;

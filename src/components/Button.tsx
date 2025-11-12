import React from "react";

const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-150 cursor-pointer ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React from "react";

const H1 = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      className={`${props.className} text-3xl font-bold text-zinc-950 dark:text-zinc-50`}
    >
      {props.children}
    </h1>
  );
};

export default H1;

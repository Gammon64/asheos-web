import React from "react";
import Button from "./Button";

const DeleteButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      onClick={(e) => { if (confirm("Tem certeza que deseja excluir o registro?") && props.onClick) props.onClick(e) }}
      className={`bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900 ${props.className}`}
    >
      {props.children}
    </Button>
  );
};

export default DeleteButton;

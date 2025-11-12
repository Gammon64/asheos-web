import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 shadow-lg rounded-lg w-full max-w-md">
      {children}
    </div>
  );
};

export default Modal;

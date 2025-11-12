import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 mb-6">
      {children}
    </div>
  );
};

export default Card;

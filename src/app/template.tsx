import { ReactNode } from "react";

const RootTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
};

export default RootTemplate;

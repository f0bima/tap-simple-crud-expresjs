import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error(
      "Toast Context is undefined, are you missing a context ToastProvider?"
    );

  return context;
};

export default useToastContext;

import { CToaster } from "@coreui/react";
import { useRef, useState } from "react";
import Toast from "../components/Toast";
import { ToastContext } from "../hooks/useToastContext";

const ToastProvider = (props) => {
  const [toast, addToast] = useState();
  const toaster = useRef(null);

  const showToast = ({ message, isSuccess }) => {
    addToast(Toast({ message, isSuccess }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {props.children}
      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;

import { CToast, CToastBody, CToastHeader } from "@coreui/react";

const Toast = ({ message, isSuccess = true }) => {
  // const color = useMemo(() => {
  //   return isSuccess ? "#007aff" : "#f00";
  // }, [isSuccess]);

  return (
    <CToast autohide={true}>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect
            width="100%"
            height="100%"
            fill={isSuccess ? "#007aff" : "#f00"}
          ></rect>
        </svg>
        <div className="fw-bold me-auto">{isSuccess ? "Success" : "Error"}</div>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  );
};

export default Toast;

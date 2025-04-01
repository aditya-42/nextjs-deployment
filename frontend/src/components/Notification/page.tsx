import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message: string, type: "success" | "error" | "info" | "warning") => {
  toast(message, { type, autoClose: 5000, position: "top-right" });
};

 const Notification: React.FC = () => {
  return <ToastContainer />;
};

export default Notification ;

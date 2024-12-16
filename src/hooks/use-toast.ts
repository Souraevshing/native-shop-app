import { ToastOptions, useToast } from "react-native-toast-notifications";

export const useCustomToast = () => {
  const toast = useToast();

  const showSuccess = (
    message: string | JSX.Element,
    options?: ToastOptions
  ) => {
    toast.show(message, { type: "success", ...options });
  };

  const showError = (message: string | JSX.Element, options?: ToastOptions) => {
    toast.show(message, { type: "danger", ...options });
  };

  const showWarning = (
    message: string | JSX.Element,
    options?: ToastOptions
  ) => {
    toast.show(message, { type: "warning", ...options });
  };

  return { showSuccess, showError, showWarning };
};

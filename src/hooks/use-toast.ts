import { ToastOptions, useToast } from "react-native-toast-notifications";

export const useCustomToast = () => {
  const toast = useToast();

  const showSuccess = (
    message: string | JSX.Element,
    options?: ToastOptions
  ) => {
    toast.show(message, {
      type: "success",
      ...options,
      animationType: "slide-in",
    });
  };

  const showError = (message: string | JSX.Element, options?: ToastOptions) => {
    toast.show(message, {
      type: "danger",
      ...options,
      animationType: "slide-in",
    });
  };

  const showWarning = (
    message: string | JSX.Element,
    options?: ToastOptions
  ) => {
    toast.show(message, {
      type: "warning",
      ...options,
      animationType: "slide-in",
    });
  };

  const showInfo = (message: string | JSX.Element, options?: ToastOptions) => {
    toast.show(message, {
      type: "normal",
      ...options,
      animationType: "slide-in",
    });
  };

  return { showSuccess, showError, showWarning, showInfo };
};

import { toast, ToastOptions } from 'react-toastify'

export default function useToast() {
  const showSuccessToast = (message: string, options?: ToastOptions) => {
    toast.success(message, options)
  }

  const showErrorToast = (message: string, options?: ToastOptions) => {
    toast.error(message, options)
  }

  const showInfoToast = (message: string, options?: ToastOptions) => {
    toast.info(message, options)
  }

  const showWarnToast = (message: string, options?: ToastOptions) => {
    toast.warn(message, options)
  }

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarnToast
  }
}

// src/hooks/useToast.js
import { useToastContext } from '../context/ToastProvider';

const useToast = () => {
  const { showToast, hideToast } = useToastContext();
  return { showToast, hideToast };
};

export default useToast;

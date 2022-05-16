import { useCallback } from "react";

export const useDialog = () => {
  return useCallback((modalId) => {
    const elem = document.getElementById(modalId);
    window.M.Modal.init(elem);
  }, []);
};

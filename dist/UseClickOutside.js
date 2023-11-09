import { useEffect } from "react";

/**
 * It returns a function that checks if the click is outside the component and a function that adds an
 * event listener to the document
 * @returns an listener of a click outside of the ref.
 */
export const useClickOutside = (ref, isOpen, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!isOpen || !ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, isOpen, handler]);
};

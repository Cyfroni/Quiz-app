import { useEffect } from "react";

export default function useKeyDown(key, callback) {
  useEffect(() => {
    const listener = ({ key: k }) => k === key && callback();
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
}

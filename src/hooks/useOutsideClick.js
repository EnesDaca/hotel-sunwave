import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      // true means to not listen on the bubbling fase, but on capturing fase, as the event moves down the d=tree, not up the tree
      document.addEventListener("click", handleClick, listenCapturing);
      // true means to not listen on the bubbling fase, but on capturing fase, as the event moves down the d=tree, not up the tree
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

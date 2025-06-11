import { useCallback, useEffect, useRef } from "react";

function useOutsideClick(isOpened: boolean, close: () => void) {
  const ref = useRef<any>(null)

  const handleClick = useCallback((e: any) => {

    if (!ref.current.contains(e.target)) {
      close()
    }
  }, [close])

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('click', handleClick)
      return () => {
        document.removeEventListener('click', handleClick)
      }
    }
  }, [handleClick, isOpened])

  return [ref]
}

export { useOutsideClick }
import { useEffect, useState } from "react";

function useUrlState(key: string) {
  const [value, setValue] = useState<string>()

  const onChange = (value: string) => {
    setValue(value)
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get(key);
    if (paramValue) setValue(paramValue)
  }, [])

  return { value, onChange }
}

export { useUrlState }
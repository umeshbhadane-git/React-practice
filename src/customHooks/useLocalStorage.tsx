import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {

        const savedValue = localStorage.getItem(key);

        return savedValue || initialValue;
    });

    useEffect(() => {

        localStorage.setItem(key, value);

    }, [key, value]);

    return [value, setValue] as const;
}

export default useLocalStorage
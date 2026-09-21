import { useEffect, useRef } from "react";

const usePrevious = (value: number) => {
    
  const ref = useRef<number | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious
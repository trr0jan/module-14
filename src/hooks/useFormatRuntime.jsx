import { useCallback } from 'react';

const useFormatRuntime = () => {
    const formatRuntime = useCallback((runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${String(hours).padStart(2, '0')} hours : ${String(minutes).padStart(2, '0')} minutes`;
    }, []);

    return formatRuntime;
};

export default useFormatRuntime;


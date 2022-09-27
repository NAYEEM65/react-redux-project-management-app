export const useDebounce = (fn, delay) => {
    let timeoutId;
    return (...arg) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn(...arg);
        }, delay);
    };
};

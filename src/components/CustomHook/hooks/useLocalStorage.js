import { useState } from "react";

export const useLocalStorage = (key, initial) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved == null) return initial;

            try {
                return JSON.parse(saved);
            } catch {
                return typeof initial === "string" ? saved : initial;
            }
        } catch (error) {
            return initial;
        }
    });

    const setStoredValue = (val) => {
        setValue(val);
        localStorage.setItem(key, JSON.stringify(val));
    };

    return [value, setStoredValue];
};

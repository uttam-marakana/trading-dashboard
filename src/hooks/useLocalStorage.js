import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);

      if (!saved) return initialValue;

      const parsed = JSON.parse(saved);

      // Basic validation (array expected for trades)
      if (Array.isArray(initialValue) && !Array.isArray(parsed)) {
        console.warn(`⚠ Invalid data for key: ${key}, resetting`);
        return initialValue;
      }

      return parsed;
    } catch (err) {
      console.warn(`⚠ Failed to read localStorage (${key})`, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`⚠ Failed to write localStorage (${key})`, err);
    }
  }, [value, key]);

  // Safe setter (supports function updates)
  const setStoredValue = (newValue) => {
    setValue((prev) =>
      typeof newValue === "function" ? newValue(prev) : newValue,
    );
  };

  return [value, setStoredValue];
};

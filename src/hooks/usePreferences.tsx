import { useEffect, useState } from "react";
import type { Preferences } from "../types/preferences";

const STORAGE_KEY = "user_preferences";

export const usePreferences = () => {
  const [prefs, setPrefs] = useState<Preferences>({
    sources: [],
    categories: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setPrefs(JSON.parse(stored));
  }, []);

  const updatePrefs = (updates: Partial<Preferences>) => {
    const newPrefs = { ...prefs, ...updates };
    setPrefs(newPrefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
  };

  return { prefs, updatePrefs };
};

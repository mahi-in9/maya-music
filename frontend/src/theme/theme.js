const THEME_KEY = "app-theme";

export const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const getStoredTheme = () => localStorage.getItem(THEME_KEY);

export const getInitialTheme = () => getStoredTheme() || getSystemTheme();

export const applyTheme = (theme) => {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem(THEME_KEY, theme);
};

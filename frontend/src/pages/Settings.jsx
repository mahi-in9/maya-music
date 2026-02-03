import { useTheme } from "../theme/useTheme";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="
      max-w-2xl 
      mx-auto 
      mt-10 
      p-6 
      rounded-xl
      bg-white 
      dark:bg-zinc-900
      shadow
    "
    >
      <h1 className="text-2xl font-semibold mb-6 dark:text-white">Settings</h1>

      {/* Theme Preference Row */}
      <div
        className="
        flex 
        items-center 
        justify-between 
        py-4 
        border-b 
        border-zinc-200 
        dark:border-zinc-700
      "
      >
        <div>
          <p className="font-medium dark:text-white">Appearance</p>
          <p className="text-sm text-zinc-500">
            Choose how the application looks.
          </p>
        </div>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="
            px-3 py-2
            rounded-lg
            border
            bg-white
            dark:bg-zinc-800
            dark:text-white
          "
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
}

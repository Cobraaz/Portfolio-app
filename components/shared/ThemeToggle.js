import { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeToggle = ({ onChange }) => {
  const [checkedTheme, setCheckedTheme] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "Dark") {
      if (!window.__isThemeLoaded) {
        window.__isThemeLoaded = true;
        onChange();
      }
      setCheckedTheme(true);
    }
  }, []);

  return (
    <label style={{ paddingTop: "6px" }}>
      <Toggle
        id="themeToggle"
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={() => {
          onChange();
          setCheckedTheme(!checkedTheme);
          localStorage.setItem("theme", checkedTheme ? "Light" : "Dark");
        }}
        checked={checkedTheme}
      />
      <button
        onClick={() => {
          setCheckedTheme(!checkedTheme);
          onChange();
          localStorage.setItem("theme", checkedTheme ? "Light" : "Dark");
        }}
        id="themeChangeButtonId"
        className="button-invisible"
      />
    </label>
  );
};
export default ThemeToggle;

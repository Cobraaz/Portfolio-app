import { useState } from "react";
import Toggle from "react-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeToggle = ({ onChange }) => {
  const [checkedTheme, setCheckedTheme] = useState(false);
  return (
    <label style={{ paddingTop: "6px" }}>
      <Toggle
        className="day-night-toggle"
        icons={{
          checked: <FontAwesomeIcon inverse icon="sun" />,
          unchecked: <FontAwesomeIcon inverse icon="moon" />,
        }}
        onChange={() => {
          onChange();
          setCheckedTheme(!checkedTheme);
        }}
        checked={checkedTheme}
      />
      <button
        onClick={() => {
          setCheckedTheme(!checkedTheme);
          onChange();
        }}
        id="themeChangeButtonId"
        className="button-invisible"
      />
    </label>
  );
};
export default ThemeToggle;

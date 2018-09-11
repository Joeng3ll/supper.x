import React from "react";
import { ThemeContext } from "../App";
function Toolbar(props) {
  return (
    <div>
      toolbar
      <ThemeButton />
    </div>
  );
}

function ThemeButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button {...props} theme={theme}>
          {theme}
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default Toolbar;

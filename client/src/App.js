import React, { Component } from "react";
// import "./views/decorator";
// import "./views/decoratorPr";
import "./utils/proxy";
import Toolbar from "./views/context";
import Input from "./HOC";

// import * as R from "ramda";

const ThemeContext = React.createContext("light");

class App extends Component {
  componentDidMount() {}

  handleClick = () => {
    window.location.href = "www.baidu.com";
    console.log("location href");
  };
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <div className="App">
          <div className="App-heading App-flex">hello,world</div>
          <button onClick={this.handleClick}>click test</button>
          <Input />
          <Toolbar />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export { ThemeContext };
export default App;

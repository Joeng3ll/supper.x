import React, { Component } from "react";

function ppHoc(WrappedComponent) {
  return class EnhancedCpt extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
    }

    onNameChange = e => {
      this.setState({
        name: e.target.value
      });
    };
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default ppHoc;

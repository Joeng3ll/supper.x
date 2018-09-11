import React, { Component } from "react";
import Wrapper from "./decorator";

@Wrapper
export default class Hoc extends Component {
  render() {
    return <input name="name" {...this.props.name} />;
  }
}

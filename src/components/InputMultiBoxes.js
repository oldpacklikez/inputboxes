import React, { Component } from "react";
import styled from "react-emotion";
const Input = styled("input")`
  text-align: center;
`;
export default class componentName extends Component {
  state = {
    input: [
      { value: "", max: "2" },
      { value: "", max: "3" },
      { value: "", max: "4" },
      { value: "", max: "5" }
    ],
    text: ""
  };
  onChange(index, e) {
    let target = e.srcElement || e.target;
    let maxLength = e.target.attributes["maxlength"].value;
    let currentLength = e.target.value.length;

    if (currentLength >= maxLength) {
      var next = target;
      while ((next = next.nextElementSibling)) {
        if (next == null) break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    } else if (currentLength === 0) {
      var previous = target;
      while ((previous = previous.previousElementSibling)) {
        if (previous == null) break;
        if (previous.tagName.toLowerCase() === "input") {
          previous.focus();
          break;
        }
      }
    }
    this.setState({
      input: this.state.input.map(
        (item, i) =>
          i === index
            ? {
                ...this.state.input[i],
                value: e.target.value
              }
            : this.state.input[i]
      ),
      text: this.state.input
        .map(
          (item, i) =>
            i === index ? e.target.value : this.state.input[i].value
        )
        .reduce((x, y) => x + y)
    });
  }

  componentDidUpdate() {
    console.log(this.state.text);
  }
  render() {
    const inputs = this.state.input.map((item, index) => (
      <React.Fragment>
        <Input
          type="text"
          key={index}
          value={item ? item.value : this.state.input[index].value}
          maxLength={item.max}
          size={item.max}
          onChange={e => this.onChange(index, e)}
        />{" "}
      </React.Fragment>
    ));
    return <React.Fragment>{inputs}</React.Fragment>;
  }
}

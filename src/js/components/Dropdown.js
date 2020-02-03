import React from "react";
import ReactDOM from "react-dom";

class Dropdown extends React.Component {
  render() {
    return (
      <select defaultValue={this.props.options.filter(value => value.selected === true).shift().value}>
        {this.props.options.map((option,i) => {
            return <option key={i} value={option.value}>{option.text}</option>
        })}
      </select>
    );
  }
}

export default Dropdown;
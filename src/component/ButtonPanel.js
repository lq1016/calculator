import Button from "./Button";
import React from "react";
import PropTypes from "prop-types";

import "./ButtonPanel.css";

export default class ButtonPanel extends React.Component {
  static propTypes = {
    clickHandler: PropTypes.func,
  };

  handleClick = buttonName => {
    this.props.clickHandler(buttonName);
  };

  render() {
    return (
      <div className="component-button-panel">
        {/* Mode toggle button */}
        <div>
          <Button name={this.props.isScientificMode ? "Basic" : "Sci"} clickHandler={this.props.toggleMode} orange />
        </div>
        
        {/* Scientific functions row - only visible in scientific mode */}
        {this.props.isScientificMode && (
          <div>
            <Button name="sin" clickHandler={this.handleClick} scientific />
            <Button name="cos" clickHandler={this.handleClick} scientific />
            <Button name="tan" clickHandler={this.handleClick} scientific />
            <Button name="log" clickHandler={this.handleClick} scientific />
            <Button name="√" clickHandler={this.handleClick} scientific />
          </div>
        )}
        
        {/* Parentheses row - only visible in scientific mode */}
        {this.props.isScientificMode && (
          <div>
            <Button name="(" clickHandler={this.handleClick} />
            <Button name=")" clickHandler={this.handleClick} />
            <Button name="^" clickHandler={this.handleClick} />
            <Button name="π" clickHandler={this.handleClick} />
            <Button name="e" clickHandler={this.handleClick} />
          </div>
        )}
        
        {/* Basic calculator buttons */}
        <div>
          <Button name="AC" clickHandler={this.handleClick} />
          <Button name="+/-" clickHandler={this.handleClick} />
          <Button name="%" clickHandler={this.handleClick} />
          <Button name="÷" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="7" clickHandler={this.handleClick} />
          <Button name="8" clickHandler={this.handleClick} />
          <Button name="9" clickHandler={this.handleClick} />
          <Button name="x" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="4" clickHandler={this.handleClick} />
          <Button name="5" clickHandler={this.handleClick} />
          <Button name="6" clickHandler={this.handleClick} />
          <Button name="-" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="1" clickHandler={this.handleClick} />
          <Button name="2" clickHandler={this.handleClick} />
          <Button name="3" clickHandler={this.handleClick} />
          <Button name="+" clickHandler={this.handleClick} orange />
        </div>
        <div>
          <Button name="0" clickHandler={this.handleClick} wide />
          <Button name="." clickHandler={this.handleClick} />
          <Button name="=" clickHandler={this.handleClick} orange />
        </div>
      </div>
    );
  }
}

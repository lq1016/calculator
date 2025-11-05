import React from "react";
import PropTypes from "prop-types";

import "./Display.css";

export default class Display extends React.Component {
  static propTypes = {
    value: PropTypes.string,
  };

  render() {
    const { value } = this.props;
    const isError = value && value.includes('error');
    
    // Handle long numbers by truncating or using scientific notation
    let displayValue = value;
    if (displayValue && !isError) {
      const num = parseFloat(displayValue);
      if (!isNaN(num)) {
        // Truncate numbers longer than 10 digits
        if (Math.abs(num) > 1e10 || Math.abs(num) < 1e-6) {
          displayValue = num.toExponential(6);
        } else if (displayValue.length > 10) {
          displayValue = num.toFixed(6);
        }
      }
    }
    
    return (
      <div className={`component-display ${isError ? 'error' : ''}`}>
        <div>{displayValue}</div>
      </div>
    );
  }
}

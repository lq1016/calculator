import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 *   error:String      error message if any
 */
export default function calculate(obj, buttonName) {
  // Clear error when user starts a new input
  if (obj.error && (isNumber(buttonName) || buttonName === "AC")) {
    return {
      ...obj,
      error: null
    };
  }

  // If there's an error, don't process further operations
  if (obj.error) {
    return obj;
  }
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
      error: null,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }
    // If there is an operation, update next
    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }
    // If there is no operation, update next and clear the value
    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result)
          .div(Big("100"))
          .toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next)
          .div(Big("100"))
          .toString(),
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      // ignore a . if the next number already has one
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      // '=' with no operation, nothing to do
      return {};
    }
  }

  if (buttonName === "+/-" ) {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Scientific functions
  if (buttonName === "sin") {
    if (obj.next) {
      return { next: Math.sin(parseFloat(obj.next) * Math.PI / 180).toString() };
    }
    if (obj.total) {
      return { total: Math.sin(parseFloat(obj.total) * Math.PI / 180).toString() };
    }
    return {};
  }

  if (buttonName === "cos") {
    if (obj.next) {
      return { next: Math.cos(parseFloat(obj.next) * Math.PI / 180).toString() };
    }
    if (obj.total) {
      return { total: Math.cos(parseFloat(obj.total) * Math.PI / 180).toString() };
    }
    return {};
  }

  if (buttonName === "tan") {
    if (obj.next) {
      return { next: Math.tan(parseFloat(obj.next) * Math.PI / 180).toString() };
    }
    if (obj.total) {
      return { total: Math.tan(parseFloat(obj.total) * Math.PI / 180).toString() };
    }
    return {};
  }

  if (buttonName === "log") {
    if (obj.next) {
      return { next: Math.log10(parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: Math.log10(parseFloat(obj.total)).toString() };
    }
    return {};
  }

  if (buttonName === "√") {
    if (obj.next) {
      return { next: Math.sqrt(parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: Math.sqrt(parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Parentheses handling
  if (buttonName === "(") {
    return {
      ...obj,
      next: obj.next ? obj.next + "(" : "(",
      parenthesisCount: (obj.parenthesisCount || 0) + 1
    };
  }

  if (buttonName === ")") {
    const openParentheses = obj.parenthesisCount || 0;
    if (openParentheses <= 0) {
      return {
        ...obj,
        error: "Mismatched parentheses"
      };
    }
    return {
      ...obj,
      next: obj.next ? obj.next + ")" : ")",
      parenthesisCount: openParentheses - 1
    };
  }

  // Exponentiation
  if (buttonName === "^") {
    if (obj.next) {
      return {
        ...obj,
        total: obj.next,
        next: null,
        operation: "^"
      };
    }
    return obj;
  }

  // Pi constant
  if (buttonName === "π") {
    return {
      ...obj,
      next: Math.PI.toString()
    };
  }

  // Euler's number
  if (buttonName === "e") {
    return {
      ...obj,
      next: Math.E.toString()
    };
  }

  // Button must be an operation

  // Handle consecutive operators - ignore if no number to operate on
  if (!obj.next && !obj.total) {
    return obj;
  }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    // If there's no next number, just update the operation
    if (!obj.next) {
      return {
        ...obj,
        operation: buttonName
      };
    }
    
    try {
      let result;
      if (obj.operation === "^") {
        // Handle exponentiation separately since it's not in operate.js
        const base = parseFloat(obj.total);
        const exponent = parseFloat(obj.next);
        result = Math.pow(base, exponent).toString();
      } else {
        result = operate(obj.total, obj.next, obj.operation);
      }
      
      return {
        total: result,
        next: null,
        operation: buttonName,
      };
    } catch (error) {
      return {
        ...obj,
        error: error.message || "Invalid operation"
      };
    }
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return { operation: buttonName };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}

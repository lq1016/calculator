import Big from "big.js";

export default function operate(numberOne, numberTwo, operation) {
  // Handle null/undefined inputs
  if (numberOne === null || numberOne === undefined) numberOne = "0";
  if (numberTwo === null || numberTwo === undefined) {
    numberTwo = operation === "÷" || operation === "x" ? "1" : "0";
  }
  
  const one = Big(numberOne);
  const two = Big(numberTwo);
  
  try {
    if (operation === "+") {
      return one.plus(two).toString();
    }
    if (operation === "-") {
      return one.minus(two).toString();
    }
    if (operation === "x") {
      return one.times(two).toString();
    }
    if (operation === "÷") {
      if (two.eq(0)) {
        throw new Error("Divide by 0 error");
      }
      return one.div(two).toString();
    }
  } catch (error) {
    throw error;
  }
  
  throw new Error(`Unknown operation '${operation}'`);
}

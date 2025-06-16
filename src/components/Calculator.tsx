"use client";

import { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import Display from "./Display";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clear = () => {
    setDisplay("");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (): number => {
    const secondOperand = parseFloat(display);
    const first = firstOperand || 0;
    switch (operator) {
      case "+":
        return first + secondOperand;
      case "-":
        return first - secondOperand;
      case "*":
        return first * secondOperand;
      case "/":
        if (secondOperand === 0) {
          alert("Cannot divide by zero");
          clear();
          return 0;
        }
        return first / secondOperand;
      case "%":
        return first * (secondOperand / 100);
      default:
        return secondOperand;
    }
  };

  const toggleSign = () => {
    if (display !== "0") {
      setDisplay(display.charAt(0) === "-" ? display.slice(1) : "-" + display);
    }
  };

  const handleEquals = () => {
    if (operator && !waitingForSecondOperand) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(true);
    }
  };

  // Keyboard support
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (/\d/.test(key)) {
        event.preventDefault();
        inputDigit(key);
      } else if (key === ".") {
        event.preventDefault();
        inputDecimal();
      } else if (key === "=" || key === "Enter") {
        event.preventDefault();
        handleEquals();
      } else if (["+", "-", "*", "/"].includes(key)) {
        event.preventDefault();
        handleOperator(key);
      } else if (key === "Escape") {
        event.preventDefault();
        clear();
      }
    },
    [display, operator, firstOperand, waitingForSecondOperand]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-[350px] max-w-xs mx-auto bg-gray-100 rounded-lg shadow-lg p-4 border border-gray-300">
      <p className="text-center mb-4 font-semibold text-gray-800 text-[25px]">
        Calculadora
      </p>
      <Display value={display} />
      <div className="grid grid-cols-4 gap-2 mt-4">
        <Button value="C" onClick={clear} variant="function" />
        <Button value="±" onClick={() => toggleSign()} variant="function" />
        <Button
          value="%"
          onClick={() => handleOperator("%")}
          variant="function"
        />
        <Button
          value="÷"
          onClick={() => handleOperator("/")}
          variant="function"
        />
        <Button value="7" onClick={() => inputDigit("7")} />
        <Button value="8" onClick={() => inputDigit("8")} />
        <Button value="9" onClick={() => inputDigit("9")} />
        <Button
          value="x"
          onClick={() => handleOperator("*")}
          variant="operator"
        />
        <Button value="4" onClick={() => inputDigit("4")} />
        <Button value="5" onClick={() => inputDigit("5")} />
        <Button value="6" onClick={() => inputDigit("6")} />
        <Button
          value="-"
          onClick={() => handleOperator("-")}
          variant="operator"
        />
        <Button value="1" onClick={() => inputDigit("1")} />
        <Button value="2" onClick={() => inputDigit("2")} />
        <Button value="3" onClick={() => inputDigit("3")} />
        <Button
          value="+"
          onClick={() => handleOperator("+")}
          variant="operator"
        />
        <Button
          value="0"
          onClick={() => inputDigit("0")}
          className="col-span-2"
        />
        <Button value="." onClick={inputDecimal} />
        <Button value="=" onClick={handleEquals} variant="operator" />
      </div>
    </div>
  );
};

export default Calculator;

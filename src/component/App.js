import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import ThemeSelector from "./ThemeSelector";
import "./App.css";
import "../styles/theme.css";

export default class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    isScientificMode: false,
    error: null,
    parenthesisCount: 0,
    theme: "default",
  };

  handleClick = buttonName => {
    this.setState(calculate(this.state, buttonName));
  };

  toggleMode = () => {
    this.setState(prevState => ({
      isScientificMode: !prevState.isScientificMode,
    }));
  };

  componentDidMount() {
    // 从本地存储加载主题
    const savedTheme = localStorage.getItem("calculatorTheme");
    if (savedTheme) {
      this.setState({ theme: savedTheme });
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }

  handleThemeChange = (newTheme) => {
    this.setState({ theme: newTheme });
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("calculatorTheme", newTheme);
  };

  render() {
    return (
      <div className="component-app">
        <ThemeSelector
          theme={this.state.theme}
          onThemeChange={this.handleThemeChange}
        />
        <Display value={this.state.error || this.state.next || this.state.total || "0"} />
        <ButtonPanel 
          clickHandler={this.handleClick} 
          isScientificMode={this.state.isScientificMode}
          toggleMode={this.toggleMode}
        />
      </div>
    );
  }
}

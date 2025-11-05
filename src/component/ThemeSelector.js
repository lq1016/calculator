import React from 'react';

class ThemeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme || 'default'
    };
  }

  handleThemeChange = (e) => {
    const newTheme = e.target.value;
    this.setState({ theme: newTheme });
    this.props.onThemeChange(newTheme);
  };

  render() {
    return (
      <div className="theme-selector">
        <label htmlFor="theme-select">主题:</label>
        <select
          id="theme-select"
          value={this.state.theme}
          onChange={this.handleThemeChange}
        >
          <option value="default">默认(蓝色)</option>
          <option value="dark">深色</option>
          <option value="green">绿色</option>
          <option value="purple">紫色</option>
        </select>
      </div>
    );
  }
}

export default ThemeSelector;
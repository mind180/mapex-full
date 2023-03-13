import React from 'react';
import './ColorPicker.css';
import { nodeColors } from '../../../../config.js';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color
    };

    this.handleColorValue = this.handleColorValue.bind(this);
  }

  handleColorValue(e) {
    e.stopPropagation();
  }

  render() {
    if (!this.props.isShown) return null;

    return (
      <div className='color-picker'>
        {nodeColors.map((color) => (
          <div key={color} className='color-picker-item' style={{backgroundColor: color}}
            title={color} data-color={color}></div>
        ))}
        <span>
          <input className='color-picker-value'
                 type="text"
                 defaultValue={this.props.color}
                 onClick={this.handleColorValue}
          />
        </span>
      </div>    
    )
  }
}

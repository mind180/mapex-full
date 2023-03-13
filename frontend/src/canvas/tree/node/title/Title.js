import React from 'react';
import './Title.css';

export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount() {
    this.props.initSize(this.inputElement.current);
  }

  render() {
    const style = {
      backgroundColor: this.props.backgroundColor
    };

    return (
      <textarea ref={this.inputElement}
        className='node-title'
        style={style}
        rows={this.props.rows}
        defaultValue={this.props.text}
        draggable onDragStart={e => e.preventDefault()}
        onChange={this.props.onChangeText}
        onBlur={this.props.handleUpdateTitle}
      />
    )
  }
}

import React from 'react';
import './Title.css';

export default class TitleView extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }

  componentDidMount() {
    this.props.initSize(this.inputElement.current);
  }

  render() {
    const style = {
      backgroundColor: this.props.backgroundColor,
      cursor: 'pointer'
    };

    return (
      <textarea  data-id={this.props.stageId} disabled ref={this.inputElement}
        className='node-title'
        style={style}
        rows={this.props.rows}
        defaultValue={this.props.text}
        draggable onDragStart={e => e.preventDefault()}
        onClick={this.props.onClick}
      />
    )
  }
}

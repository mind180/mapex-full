import React from 'react';

export default class KeyStrokeHandler extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyUp);
  }

  handleKeyUp(e) {
    if (!this.isCtrlSPressed(e)) return;

    e.preventDefault();
    console.log(this.props.canvas);

    const canvas = this.props.canvas;
    canvas.nodes = this.props.nodes;
    canvas.edges = this.props.edges;

    this.saveCanvas(`canvas/${this.props.canvas.id}`, canvas)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  isCtrlSPressed(event) {
    if (event.ctrlKey && event.key === 's') {
      return true;
    }
    return false;
  }
  
  async saveCanvas(canvasUrl, canvas) {
    return fetch(canvasUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(canvas)
    })
      .then(responce => responce.json());
  }

  render() {
    return (
      <div className='hey-stroke-handler'>
        {this.props.children}
      </div>
    );
  }
}

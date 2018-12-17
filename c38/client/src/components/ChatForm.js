import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

export default class ChatForm extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', message: ''};
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e){
    this.setState({ name: e.target.value});
  }

  handleChangeMessage(e){
    this.setState({ message: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.name.length && !this.state.message.length) {
      return;
    }
    const newItem = {
      id: Date.now(),
      name: this.state.name,
      message: this.state.message
    };
    this.props.addChat(newItem);
    this.setState({ name: '', message: ''});
  }


  render() {

    return (
      <form onSubmit={this.handleSubmit}>
      <div className="timeline-label">

      <div>
      <input type="text" className="form-control col-sm-2 " id="name" onChange={this.handleChangeName} value={this.state.name} placeholder="your name" />
      </div>

      <br/>
      <br/>

      <div>
      <textarea className="form-control" id="message" rows="3" onChange={this.handleChangeMessage} value={this.state.message}  placeholder="write your chat here..."></textarea>
      </div>
      <br/>

      <Button bsStyle="primary" type="submit">Post</Button>
      </div>
      </form>
    );
  }
}

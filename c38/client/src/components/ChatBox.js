import React, { Component } from 'react';
import ChatForm from './ChatForm';
import ChatList from './ChatList';
import {Well} from 'react-bootstrap';
import superagent from 'superagent';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:3001');

class ChatBox extends Component {
  constructor(props){
    super(props);
    this.state = { pesan: [] };
  }

  componentDidMount() {
    socket.on("updateChat", response =>{
      this.setState({pesan: response.data})
    })
  }

  componentWillMount() {
    superagent
    .get('http://localhost:3001/')
    .query(null)
    .set('Accept', 'application/json')
    .end ((error, response)=>{
      console.log("Data", response);
      let data=response.body


      this.setState({
        pesan: data
      })
    })
}

  addChat = newItem => {
   superagent
   .post('http://localhost:3001/')
   .send(newItem)
   .set('Accept', 'application/json')
   .end ((error, response)=>{
     socket.emit("newChat", newItem);
     this.setState({ pesan: [...this.state.pesan, newItem]
     })
   })
}

  render() {
    return (
      <div className="container">
      <div className="panel panel-default">
      <div className="panel-heading App">
      <Well><h3><b> REACT CHAT </b></h3></Well>
      </div>

      <div className="panel-body">
      <div className="row">
      <div className="timeline-centered">



      <ChatList data={this.state.pesan}/>



      <article className="timeline-entry begin">
      <div className="timeline-entry-inner">
      <div className="timeline-icon" >
      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </div>
      <ChatForm addChat={this.addChat}/>
      </div>
      </article>

      </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default ChatBox;

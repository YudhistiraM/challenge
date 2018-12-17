import React, { Component } from 'react';
import Chat from './Chat';


export default class ChatList extends Component {
  render() {
    return (
      
      <div>
      {this.props.data.map(item =>(
        <Chat key={item.id} name={item.name} message={item.message} />
      ))}
      </div>
    );
  }
}

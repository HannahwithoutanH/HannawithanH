import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';

import MessageList from './MessageList';
import sendMessage from './SendMessage';

class MessageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        senderId: 'perborgen',
        text: "who'll win?",
      },
      {
        senderId: 'janedoe',
        text: "who'll win?",
      }],
    };
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <SendMessage messages={this.state.messages}/>
      </div>
    );
  }
}

export default MessageContainer;

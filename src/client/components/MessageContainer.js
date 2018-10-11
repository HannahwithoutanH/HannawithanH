import React from 'react';

import MessageList from './MessageList';
import SendMessage from './SendMessage';

class MessageContainer extends React.Component {
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

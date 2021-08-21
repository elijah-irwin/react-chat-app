import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({ message, name }) => {
  const cleanName = name.trim().toLowerCase();
  const sentByCurrentUser = message.user === cleanName ? true : false;

  if (sentByCurrentUser) {
    return (
      <div className='messageContainer justifyEnd'>
        <p className='sentText pr-10'>{cleanName}</p>
        <div className='messageBox backgroundBlue'>
          <p className='messageText colorWhite'>{ReactEmoji.emojify(message.text)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='messageContainer justifyStart'>
      <div className='messageBox backgroundLight'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(message.text)}</p>
      </div>
      <p className='sentText pl-10'>{message.user}</p>
    </div>
  );
};

export default Message;

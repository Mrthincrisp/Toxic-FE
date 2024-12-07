import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getChatMessages } from '../api/MessageCalls';
import MessageForm from '../forms/MessageForm';
import Message from './Message';

export default function ChatModal({ chat, show, onClose }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (show) {
      // setloading
      getChatMessages(chat.id).then(setMessages);
    } else {
      setMessages([]);
    }
  }, [show, chat]);
  console.warn('chat', chat);

  return (
    <Modal style={{ color: 'black' }} show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{chat.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <MessageForm chatId={chat.id} />
      </Modal.Footer>
    </Modal>
  );
}

ChatModal.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { getChatMessages } from '../api/MessageCalls';
import MessageForm from '../forms/MessageForm';
import Message from './Message';
import { useSignalR } from '../utils/context/SignalRContext';

export default function ChatModal({ chat, show, onClose }) {
  const { messages, sendMessage, joinChat, clearMessages } = useSignalR();
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    if (show) {
      setLoading(true); // Set loading to true when fetching messages
      getChatMessages(chat.id).then((fetchedMessages) => {
        setChatMessages(fetchedMessages);
        setLoading(false); // Set loading to false once messages are fetched
      });

      // Join chat when modal is shown
      joinChat(chat.id);
    } else {
      setChatMessages([]); // Clear messages when modal is hidden
    }
  }, [show, chat.id]);

  useEffect(() => {
    // This effect listens for new messages in the SignalR context
    // When a new message arrives, update the messages state
    if (messages.length > 0) {
      console.warn('message', messages);
      setChatMessages((prevMessages) => [...prevMessages, ...messages]);
      clearMessages();
    }
  }, [messages]);

  return (
    <Modal style={{ color: 'black' }} show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{chat.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{loading ? <div>Loading...</div> : chatMessages.map((message) => <Message key={message.id} message={message} />)}</Modal.Body>
      <Modal.Footer>
        <MessageForm chatId={chat.id} sendMessage={sendMessage} />
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

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

  const refreshMessages = async () => {
    setLoading(true);
    const fetchedMessages = await getChatMessages(chat.id);
    const sortedMessages = fetchedMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    setChatMessages(sortedMessages);
    setLoading(false);
  };

  useEffect(() => {
    if (show) {
      refreshMessages();
      joinChat(chat.id);
    } else {
      setChatMessages([]);
    }
  }, [show, chat.id]);

  useEffect(() => {
    if (messages.length > 0) {
      setChatMessages((prevMessages) => {
        const newMessages = messages.filter((newMessage) => !prevMessages.some((msg) => msg.id === newMessage.id));

        return [...prevMessages, ...newMessages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      });
      clearMessages();
    }
  }, [messages]);

  return (
    <Modal style={{ color: 'black' }} show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{chat.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{loading ? <div>Loading...</div> : chatMessages.map((message) => <Message key={message.id} message={message} refreshMessages={refreshMessages} />)}</Modal.Body>
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

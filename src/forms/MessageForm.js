import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createNewMessage } from '../api/MessageCalls';

export default function MessageForm({ chatId }) {
  const [messageContent, setMessageContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { chatId, content: messageContent, userId: user.id, createdAt: new Date().toISOString() };
    createNewMessage(payload);
    setMessageContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <textarea className="form-control" rows="3" placeholder="Send a message" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} required />
      </div>
      <Button type="submit">Send</Button>
    </form>
  );
}

MessageForm.propTypes = {
  chatId: PropTypes.number.isRequired,
};

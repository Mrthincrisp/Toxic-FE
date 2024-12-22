import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function MessageForm({ chatId, sendMessage }) {
  const [messageContent, setMessageContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(messageContent, user.id, chatId);
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
  sendMessage: PropTypes.func.isRequired,
};

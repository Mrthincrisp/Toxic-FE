/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { deleteMessage, editMessage } from '../api/MessageCalls';

export default function Message({ message, refreshMessages }) {
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const { user } = useAuth();

  const handleEdit = () => {
    setEdit(true);
  };

  const handleClose = () => {
    setEdit(false);
    setEditContent(message.content);
  };

  const handleSave = async () => {
    const payload = { content: editContent };
    await editMessage(message.id, payload);
    setEdit(false);
    await refreshMessages();
  };

  const handleChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      await deleteMessage(id);
      await refreshMessages();
    }
  };

  return (
    <>
      {edit ? (
        <div>
          <textarea value={editContent} onChange={handleChange} />
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      ) : message.userId === user.id ? (
        <div style={{ backgroundColor: 'green' }}>
          {message.content}
          <DropdownButton id="dropdown-basic-button" title="">
            <Dropdown.Item onClick={handleEdit}>Edit message</Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(message.id)}>Delete</Dropdown.Item>
          </DropdownButton>
        </div>
      ) : (
        <div style={{ backgroundColor: 'red' }}>{message.content}</div>
      )}
    </>
  );
}

Message.propTypes = {
  userId: PropTypes.number,
  content: PropTypes.string,
}.isRequired;

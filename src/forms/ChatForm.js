import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getAllUsers } from '../api/UserCalls';
import { useAuth } from '../utils/context/authContext';
import { createNewChat } from '../api/ChatCalls';

export default function ChatForm() {
  const [users, setUsers] = useState([]);
  const [formInput, setFormInput] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInput);
    createNewChat(formInput, user.id);
    setFormInput([]);
  };

  const handleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => Number(option.value)); // Get selected values
    setFormInput((prevInput) => [...new Set([...prevInput, ...selectedValues])]); // Merge with existing values, removing duplicates
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicAbout">
        <Form.Label>New Chat</Form.Label>
        <Form.Select multiple value={formInput} required onChange={handleChange}>
          <option value="" disabled>
            Select users to add...
          </option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.userName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Chat
      </Button>
    </Form>
  );
}

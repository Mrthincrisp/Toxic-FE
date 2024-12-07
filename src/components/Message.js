/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';

export default function Message({ message }) {
  const { user } = useAuth();

  return <>{message.userId === user.id ? <div style={{ backgroundColor: 'green' }}>{message.content}</div> : <div style={{ backgroundColor: 'red' }}>{message.content}</div>}</>;
}

Message.propTypes = {
  userId: PropTypes.number,
  content: PropTypes.string,
}.isRequired;

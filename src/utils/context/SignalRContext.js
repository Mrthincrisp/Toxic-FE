import React, { createContext, useMemo, useEffect, useState, useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HubConnectionBuilder } from '@microsoft/signalr';
import PropTypes from 'prop-types';

const SignalRContext = createContext();

const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalR must be used within a SignalRContext.Provider');
  }
  return context;
};

function SignalRContextProvider({ children }) {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    let newConnection;

    const connectSignalR = async () => {
      newConnection = new HubConnectionBuilder().withUrl('https://localhost:8000/message-hub').build();

      try {
        await newConnection.start();
        setConnection(newConnection);

        newConnection.off('RecieveMessage');

        // Register the event listener once
        newConnection.on('RecieveMessage', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      } catch (err) {
        console.error('Error connecting to SignalR: ', err);
      }
    };

    connectSignalR();

    // Cleanup function to stop the connection
    return () => {
      if (newConnection) {
        newConnection.off('RecieveMessage'); // Ensure listener is removed
        newConnection.stop();
      }
    };
  }, []);

  // Wrap sendMessage and joinChat inside useMemo to avoid re-renders
  const contextValue = useMemo(() => {
    const sendMessage = async (content, userId, chatId) => {
      const createMessage = {
        content,
        createdAt: new Date().toISOString(),
        userId,
        chatId,
      };

      try {
        await connection.invoke('SendMessage', createMessage);
      } catch (err) {
        console.error('Error sending message:', err);
      }
    };

    const joinChat = async (newChatId) => {
      if (connection) {
        await connection.invoke('JoinChat', newChatId);
      } else {
        console.error('Connection is not established yet');
      }
    };

    // Return the functions and messages as part of the context value
    return { messages, sendMessage, joinChat, clearMessages };
  }, [messages, connection]); // Dependencies: when messages, chatId, or connection change

  return <SignalRContext.Provider value={contextValue}>{children}</SignalRContext.Provider>;
}

export { useSignalR, SignalRContextProvider };

SignalRContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

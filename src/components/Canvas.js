import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Dropdown } from 'react-bootstrap';
import UserChats from './UserChats';
import { useCanvas } from './CanvasContext';
import ChatForm from '../forms/ChatForm';
// import { useState } from 'react';

export default function Canvas() {
  const { canvasState, toggleCanvas } = useCanvas();
  //  const [trigger, setTrigger] = useState(false)

  if (!canvasState) {
    return null;
  }

  return (
    <>
      <Button variant="primary" onClick={toggleCanvas} className="me-2">
        Button
      </Button>
      <Offcanvas show={canvasState} onHide={toggleCanvas}>
        <Offcanvas.Header closeButton>
          <Dropdown className="d-inline mx-2" autoClose={false}>
            <Dropdown.Toggle id="dropdown-autoclose-false">Create Chat</Dropdown.Toggle>
            <Dropdown.Menu>
              <ChatForm />
            </Dropdown.Menu>
          </Dropdown>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserChats />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

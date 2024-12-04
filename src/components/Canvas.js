import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import UserChats from './UserChats';
import { useCanvas } from './CanvasContext';

export default function Canvas() {
  const { canvasState, toggleCanvas } = useCanvas();

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
          <Offcanvas.Title>Messages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserChats />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

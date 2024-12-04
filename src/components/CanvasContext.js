import PropTypes from 'prop-types';
import { createContext, useContext, useMemo, useState } from 'react';

const CanvasContext = createContext();

const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasContext.Provider');
  }
  return context;
};

function CanvasContextProvider({ children }) {
  const [canvasState, setCanvasState] = useState(false);
  const toggleCanvas = () => setCanvasState((prev) => !prev);

  const contextValue = useMemo(() => ({ canvasState, toggleCanvas }), [canvasState]);

  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>;
}

export { useCanvas, CanvasContextProvider };

CanvasContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

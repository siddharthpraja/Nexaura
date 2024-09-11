import React, { useState, useRef, CSSProperties, MouseEvent } from 'react';

interface ResizableMovableImageProps {
  src: string;
  id: string;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
  onDelete: (id: string) => void; // Add onDelete prop
}

const ResizableMovableImage: React.FC<ResizableMovableImageProps> = ({ src, id, onMove, onResize, onDelete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startDim = useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleResizeMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startDim.current = { width: dimensions.width, height: dimensions.height };
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      setPosition({ x: newX, y: newY });
      onMove(id, newX, newY);
    }
    if (isResizing) {
      setIsDragging(false);
      const newWidth = Math.max(50, startDim.current.width + (e.clientX - startPos.current.x));
      const newHeight = Math.max(50, startDim.current.height + (e.clientY - startPos.current.y));
      setDimensions({ width: newWidth, height: newHeight });
      onResize(id, newWidth, newHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  const handleDelete = () => {
    onDelete(id); // Call onDelete prop when delete button is clicked
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove as any);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const imageStyle: CSSProperties = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    cursor: isDragging ? 'grabbing' : 'pointer',
    zIndex: 10,
  };

  const resizeHandleStyle: CSSProperties = {
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '20px',
    height: '20px',
    cursor: 'nwse-resize',
    background: 'rgba(0, 0, 0, 0.5)',
  };

  const deleteButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'gray',
    border: 'none',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    zIndex: 11,
  };

  return (
    <div
      style={imageStyle}
      onMouseDown={handleMouseDown}
    >
      <img src={src} alt="" style={{ width: '100%', height: '100%' }} />
      <div
        style={resizeHandleStyle}
        onMouseDown={handleResizeMouseDown}
      />
      <button
        style={deleteButtonStyle}
        onClick={handleDelete}
        title="Delete"
      >
        ×
      </button>
    </div>
  );
};

export default ResizableMovableImage;

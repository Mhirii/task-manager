import React from 'react';
const useMousePosition = () => {
  
  
  const [
    mousePosition,
    setMousePosition
  ] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    // @ts-ignore
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
      console.log(mousePosition)
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
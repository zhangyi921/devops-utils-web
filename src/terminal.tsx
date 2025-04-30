import { useEffect, useRef } from 'react'
import './xterm.css'
import { Terminal } from '@xterm/xterm';

function Ter() {

  const containerRef = useRef(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Initialize Xterm.js terminal
    const term = new Terminal({
      cursorBlink: true,   // Optional: make cursor blink to emphasize focus
      scrollback: 1000,     // Optional: larger scrollback for history
      cols: 150,
      rows: 47,
    });
    term.open(containerRef.current!);           // Attach terminal to the DOM container
    term.focus();                              // Focus terminal for immediate input

    // Connect to backend WebSocket
    const socket = new WebSocket("/ws");  // backend runs on port 3001
    socketRef.current = socket;

    // When backend sends data, write it to the terminal
    socket.onmessage = event => {
      term.write(event.data);
    };

    // When user types in the terminal, send it to the backend
    term.onData(data => {
    //   console.log('Sending data to server:', data);
      socket.send(data);
    });

    // Handle connection open/close for user feedback
    socket.onopen = () => {
      term.write('\x1b[32m*** Connected to server ***\x1b[0m\r\n');  // green text
    };
    socket.onclose = () => {
      term.write('\r\n\x1b[31m*** Disconnected from server ***\x1b[0m\r\n');
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
      term.dispose();
    };
  }, []);

  // The container that xterm.js will use to render the terminal
  return <div >
    <div ref={containerRef} style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    }} />
    <button onClick={() => {
      socketRef.current?.send('ls\n');
    }}>ls</button>
  </div>;
}

export default Ter

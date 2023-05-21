import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
const room_name = 'test'
const WebSocketDemo = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/ws/' + room_name + '/');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      // @ts-ignore
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  
  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('ws://127.0.0.1:8000/ws/test2/'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className='flex flex-col'>
      <button 
        className='bg-gray-500 rounded-lg p-5 text-white'
        onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        className='bg-gray-800 rounded-lg p-5 text-white'
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul className='max-w-[32rem]'>
        {messageHistory.map((message, idx) => (
        //   @ts-ignore
          <span key={idx}>{message ? message?.data : null}</span>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketDemo
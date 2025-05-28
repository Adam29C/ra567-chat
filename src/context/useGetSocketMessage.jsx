import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import notificationSound from '../assets/notification_sound.wav';
import { setMessage } from '../Redux/features/message/messageSlice';
import { useSocketContext } from './SocketContext';

const useGetSocketMessage = () => {

  let msgs = [
    {
      id: 1,
      message: 'Hello! How are you doing today?',
    },
    {
      id: 2,
      message: "Don't forget to check the new updates!",
    },
    {
      id: 3,
      message: 'Are we still on for the meeting tomorrow?',
    },
    {
      id: 4,
      message: 'Great job on the presentation earlier!',
    },
    {
      id: 5,
      message: 'Can you share the document we discussed?',
    },
    {
      id: 6,
      message: 'Lunch at 1 PM? Let me know!',
    },
    {
      id: 7,
      message: 'Just saw your message, will reply soon.',
    },
    {
      id: 8,
      message: 'Happy birthday! Wishing you all the best!',
    },
    {
      id: 9,
      message: 'Can you help me with this task?',
    },
    {
      id: 10,
      message: 'Thanks for the update. Looks good to me!',
    },
  ];
  const messages = useSelector((state) => state.message.messages);
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      const notification = new Audio(notificationSound);
      notification.play();
      dispatch(setMessage([...messages, newMessage]));
      //   dispatch(sendMessages([...messages, newMessage]));
    });
    return () => {
      socket.off('newMessage');
    };
  }, [socket, messages]);
  //   return <div></div>;
};

// export default useGetSocketMessage;
export { useGetSocketMessage };

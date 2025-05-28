import { base_url } from './api_config';
import socketIOClient from 'socket.io-client';
import socket from './Socket';
import { convertTimestamp } from './date.config';

// export const SocketIntiate = (selectedUser, _id) => {
//   const socket = socketIOClient(base_url);
//   let receiverId = selectedUser._id;
//   socket.emit('join_room', `${_id}-${receiverId}`);
// };

// export const JoinSocketIntiate = (selectedUser, _id) => {
//   const socket = socketIOClient(base_url);
//   let receiverId = selectedUser._id;
//   socket.emit('join_room', `${_id}-${receiverId}`);
// };

// export const SendMessages = (selectedUser, _id, message, name) => {
//   let receiverId = selectedUser.userId;
//   let room_ID = `${_id}-${receiverId}`;

//   socket.emit('send_message', {
//     sender: _id,
//     receiver: receiverId,
//     message,
//     replyName: null,
//     replyMessage: null,
//     images: '',
//     audios: '',
//     videos: '',
//     messStatus: 1,
//     userName: name,
//     room: room_ID,
//     dateTime: convertTimestamp(new Date().toISOString()),
//     dateTimestamp: Date.now(),
//   });

//   socket.emit('get_messages', room_ID);

//   return () => {
//     socket.off('send_message');
//     socket.off('get_messages');
//     socket.disconnect();
//   };
// };

export const SendMessages = (selectedUser, _id, message, name) => {
  const receiverId = selectedUser.userId;
  const ids = [_id, receiverId].sort();
  const room_ID = `${ids[0]}-${ids[1]}`;

  socket.emit('send_message', {
    sender: _id,
    receiver: receiverId,
    message,
    replyName: null,
    replyMessage: null,
    images: '',
    audios: '',
    videos: '',
    messStatus: 1,
    userName: name,
    room: room_ID,
    dateTime: convertTimestamp(new Date().toISOString()),
    dateTimestamp: Date.now(),
  });
  socket.on('update_user_list_entry', (data) => {
    // console.log('update_user_list_entry', data);
  });

  socket.emit('get_messages', room_ID);
};

export const RepalyMessages = (selectedUser, _id, message, name, details) => {
  const receiverId = selectedUser.userId;
  const ids = [_id, receiverId].sort();
  const room_ID = `${ids[0]}-${ids[1]}`;

  // console.log('room_ID', {
  //   sender: _id,
  //   receiver: receiverId,
  //   message: message,
  //   replyName: details.username,
  //   replyMessage: details.message,
  //   images: '',
  //   audios: '',
  //   videos: '',
  //   messStatus: 1,
  //   userName: name,
  //   room: room_ID,
  //   dateTime: convertTimestamp(new Date().toISOString()),
  //   dateTimestamp: Date.now(),
  // });

  // return;
  socket.emit('send_message', {
    sender: _id,
    receiver: receiverId,
    message: message,
    replyName: details.username,
    replyMessage: details.message,
    images: '',
    audios: '',
    videos: '',
    messStatus: 1,
    userName: name,
    room: room_ID,
    dateTime: convertTimestamp(new Date().toISOString()),
    dateTimestamp: Date.now(),
  });

  socket.on('update_user_list_entry', (data) => {
    console.log('update_user_list_entry', data);
  });
  socket.emit('get_messages', room_ID);
};

export const GetSOketChatHistory = (selectedUser, _id, callback) => {
  // const socket = socketIOClient(base_url, { transports: ['websocket'] });

  if (!selectedUser?._id || !_id) return;

  let receiverId = selectedUser._id;
  let roomId = `${_id}-${receiverId}`;

  // socket.emit('join_room', roomId);
  socket.emit('get_messages', roomId);

  socket.emit('receive_message', roomId);

  socket.on('receive_message');

  socket.on('chat_history', (data) => {
    if (callback) {
      callback(data);
    }
  });

  return () => {
    socket.off('chat_history');
    socket.off('get_messages');
    socket.disconnect();
  };
};

export const GetSocketRemoveMessage = (
  selectedUser,
  _id,
  messages,
  callback
) => {
  // const socket = socketIOClient(base_url, { transports: ['websocket'] });

  const messageId = messages._id;
  const room = messages.room;
  const userId = selectedUser._id;

  const payload = { messageId: messageId, room: room };

  socket.emit('delete_message', payload);
  return () => {
    socket.off('delete_message');
    socket.disconnect();
  };
};

export const GetSOketRemove = (selectedUser, _id, callback) => {
  const socket = socketIOClient(base_url, { transports: ['websocket'] });
  if (!selectedUser?._id || !_id) return;

  let receiverId = selectedUser._id;
  let roomId = `${_id}-${receiverId}`;

  // socket.emit('join_room', roomId);

  socket.on('delete_message', (data) => {
    if (callback) {
      callback(data); // Send data to parent function
    }
  });

  return () => {
    socket.off('delete_message');
    socket.disconnect();
  };
};

export const getLastMessages = (selectedUser, _id, callback) => {
  // const socket = socketIOClient(base_url, { transports: ['websocket'] });

  // if (!selectedUser?._id || !_id) return;

  let receiverId = selectedUser._id;
  let roomId = `${_id}-${receiverId}`;

  // socket.emit('join_room', roomId);

  socket.emit('message_receive', room);

  return () => {
    socket.off('delete_message');
    socket.disconnect();
  };
};

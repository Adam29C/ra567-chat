// import { base_url } from './api_config';
// import socketIOClient from 'socket.io-client';

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

// export const SendMessages = (selectedUser, _id) => {
//   const socket = socketIOClient(base_url);

//   let room_ID = `${_id}-${selectedUser._id}`;
//   let receiverId = selectedUser._id;

//   // socket.emit('send_message', {
//   //   sender: _id,
//   //   receiver: receiverId,
//   //   message: message && message,
//   //   replyName: null,
//   //   replyMessage: null,
//   //   images: '',
//   //   audios: '',
//   //   videos: '',
//   //   // messType: "text",
//   //   messStatus: 1,
//   //   userName: name,
//   //   room: room_ID,
//   //   // room: `${_id}-${receiverId}`,
//   //   dateTime: convertTimestamp(new Date().toISOString()),
//   //   dateTimestamp: Date.now(),
//   // });

//   // const socket = socketIOClient(base_url);

//   // let receiverId = selectedUser._id;

//   // socket.emit('join_room', `${_id}-${receiverId}`);
// };

// export const GetSOketChatHistory = (selectedUser, _id, callback) => {
//   const socket = socketIOClient(base_url, { transports: ['websocket'] });

//   if (!selectedUser?._id || !_id) return;

//   let receiverId = selectedUser._id;
//   let roomId = `${_id}-${receiverId}`;

//   socket.emit('join_room', roomId);
//   socket.emit('get_messages', roomId);

//   socket.on('chat_history', (data) => {
//     if (callback) {
//       callback(data);
//     }
//   });

//   // return () => {
//   //   socket.off('chat_history');
//   //   socket.disconnect();
//   // };
// };

// export const GetSocketRemoveMessage = (
//   selectedUser,
//   _id,
//   messages,
//   callback
// ) => {
//   const socket = socketIOClient(base_url, { transports: ['websocket'] });

//   const messageId = messages._id;
//   const room = messages.room;
//   const userId = selectedUser._id;

//   const payload = { messageId: messageId, room: room, userId: userId };

//   socket.emit('join_room', room);
//   socket.emit('delete_message', payload);

//   //   GetSOketChatHistory(selectedUser, _id);

//   return () => {
//     socket.off('delete_message');
//     socket.disconnect();
//   };
// };

// export const GetSOketRemove = (selectedUser, _id, callback) => {
//   const socket = socketIOClient(base_url, { transports: ['websocket'] });
//   if (!selectedUser?._id || !_id) return;

//   let receiverId = selectedUser._id;
//   let roomId = `${_id}-${receiverId}`;

//   socket.emit('join_room', roomId);

//   socket.on('delete_message', (data) => {
//     if (callback) {
//       callback(data); // Send data to parent function
//     }
//   });

//   return () => {
//     socket.off('delete_message');
//     socket.disconnect();
//   };
// };

// export const getLastMessages = (selectedUser, _id, callback) => {
//   const socket = socketIOClient(base_url, { transports: ['websocket'] });

//   // if (!selectedUser?._id || !_id) return;

//   let receiverId = selectedUser._id;
//   let roomId = `${_id}-${receiverId}`;

//   socket.emit('join_room', roomId);

//   socket.emit('message_receive', room);

//   return () => {
//     socket.off('delete_message');
//     socket.disconnect();
//   };
// };

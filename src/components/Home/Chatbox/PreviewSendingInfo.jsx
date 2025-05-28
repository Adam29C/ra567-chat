import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { base_url } from '../../../utils/api_config';
import { convertTimestamp } from '../../../utils/date.config';
import { VisiblityPreviewImage } from '../../../Redux/features/user/userSlice';
import socket from '../../../utils/Socket';
import {
  addMessage,
  setMessage,
} from '../../../Redux/features/message/messageSlice';

const PreviewSendingInfo = () => {
  const dispatch = useDispatch();
  const { _id, email, mobile, name, role } = JSON.parse(
    localStorage.getItem('info')
  );

  const [inputMessage, setinputMessage] = useState('');
  const PreviewImage = useSelector((state) => state.user.PreviewImage);
  const getDocuments = useSelector((state) => state.user.getDocuments);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  // console.log('getDocuments', getDocuments);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    // const socket = socketIOClient(base_url);

    // if (!selectedUser?._id) {
    //   console.error('No user selected!');
    //   return;
    // }

    let abc =
      getDocuments && getDocuments.file
        ? [getDocuments && getDocuments.file]
        : '';

    let room_ID = `${_id}-${selectedUser.userId}`;
    let receiverId = selectedUser.userId;

    // console.log('dsfsfsdfdsfsdf', {
    //   sender: _id,
    //   receiver: receiverId,
    //   message: inputMessage || '',
    //   replyMessage: null,
    //   replyName: null,
    //   images: abc,
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
      message: inputMessage || '',
      replyMessage: null,
      replyName: null,
      images: abc,
      audios: '',
      videos: '',
      messStatus: 1,
      userName: name,
      room: room_ID,
      dateTime: convertTimestamp(new Date().toISOString()),
      dateTimestamp: Date.now(),
    });

    setinputMessage('');

    socket.emit('message_receive', room_ID);

    const handleMessage = (data) => {
      dispatch(addMessage(data));
    };

    socket.on('latest_message', handleMessage);

    socket.on('update_user_list_entry', (data) => {
      console.log('update_user_list_entry', data);
    });

    socket.emit('get_messages', room_ID);

    dispatch(VisiblityPreviewImage(false));

    //  useEffect(() => {
    //     socket.on('update_user_list_entry', (updatedUser) => {
    //       const updatedList = otherUsers.map((user) =>
    //         user._id === updatedUser._id ? updatedUser : user
    //       );
    //       dispatch(setOtherUsers(updatedList));
    //     });

    //     return () => {
    //       socket.off('update_user_list_entry');
    //     };
    //   }, [otherUsers]);

    // socket.emit('get_messages', room_ID);
  };

  useEffect(() => {
    socket.on('chat_history', (data) => {
      dispatch(setMessage(data));
    });

    return () => {
      socket.off('chat_history');
    };
  }, [dispatch]);

  return (
    <>
      <form action="" onSubmit={handleSendMessage}>
        <div
          className={`${PreviewImage ? 'block' : 'hidden'} w-full  min-h-[350px] sm:min-h-[490px] md:min-h-[492px] lg:min-h-[491px] 
] mt-[125px] md:mt-0 lg:mt-0 flex flex-col items-center justify-center bg-gray-900 text-white  shadow-md relative`}
        >
          <div
            className="absolute  bg-black w-full  p-2   top-2  text-blue-400 text-lg font-bold "
            onClick={() => dispatch(VisiblityPreviewImage(false))}
          >
            X &nbsp; Preview
          </div>
          {getDocuments.fileType === 'image' ? (
            <img
              src={
                getDocuments.file || 'https://dummyimage.com/600x400/000/fff'
              }
              alt="Preview"
              className="w-[72%] max-h-40 object-contain  rounded-md "
            />
          ) : (
            <video controls className="mt-4 rounded-lg shadow-lg w-full">
              <source src={getDocuments.file} type={getDocuments.fileType} />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="w-[70%] flex items-center  mt-4">
            <input
              type="text"
              placeholder="Type Caption Here..."
              value={inputMessage}
              onChange={(e) => setinputMessage(e.target.value)}
              className="w-full outline-none border-b-2 border-indigo-500   bg-gray-900 text-white placeholder-gray-400  focus:ring-0"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full ml-2"
              type="submit"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PreviewSendingInfo;

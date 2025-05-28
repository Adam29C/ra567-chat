import React, { useEffect, useState } from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import MessageSend from './MessageSend';
import { useDispatch, useSelector } from 'react-redux';
import AiMessageBox from '../Ai/AiMessageBox';
import { base_url } from '../../../utils/api_config';
import { FiSend } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import socketIOClient from 'socket.io-client';
import PreviewSendingInfo from './PreviewSendingInfo';
import ReplayMessage from './ReplayMessage';
import socket from '../../../utils/Socket';
import { setOtherUsers } from '../../../Redux/features/user/userSlice';
import ShowShortcut from './ShowShortcut';

const Chatbox = () => {
  // const socket = socketIOClient(base_url);
  const dispatch = useDispatch();
  const info = JSON.parse(localStorage.getItem('info') || '{}');

  const { _id, email, mobile, name, role } = info;

  const showSelectedUserBtn = useSelector(
    (state) => state.showSelectedBtn.value
  );
  const darkMode = useSelector((state) => state.darkTheme.value);
  const authUser = useSelector((state) => state.user.authUser);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const selectAi = useSelector((state) => state.ai.selectAi);
  const PreviewImage = useSelector((state) => state.user.PreviewImage);
  const showShortcut = useSelector((state) => state.user.showShortcut);

  const showReplay = useSelector((state) => state.user.showReplay);
  const messages = useSelector((state) => state.message.messages);
  const otherUsers = useSelector((state) => state.user.otherUsers);

  const [first, setfirst] = useState('testing');
  const [ShowReplayBox, setShowReplayBox] = useState(true);

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  useEffect(() => {
    // if (messages.length > 0) {
    // Give React a tick to render all elements before trying to scroll
    setTimeout(() => {
      const targetElement = document.getElementById('scroll-down');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Short delay ensures DOM has rendered
    // }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const targetElement = document.getElementById('scroll-down');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    const targetElement = document.getElementById('scroll-down');

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // socket.emit('mark_read', { room: roomId, messageIds: noReadedId });

  useEffect(() => {
    const noReadedId = messages
      .filter((msg) => !msg.isRead)
      .map((msg) => msg._id);

    const room_ID = `${_id}-${selectedUser?.userId}`;

    if (noReadedId.length > 0) {
      console.log('mark read on');
      socket.emit('mark_read', { room: room_ID, messageIds: noReadedId });
    }
  }, [messages, selectedUser?._id]);

  return (
    <>
      {selectAi ? (
        <AiMessageBox />
      ) : !selectedUser ? (
        <div
          className={`w-[100%] md:inline-block  md:w-[60%] lg:w-[76%] h-screen  ${showSelectedUserBtn ? 'inline-block' : 'hidden'} `}
        >
          <div className="w-[100%] h-full flex items-center justify-center main-bg">
            <div className="flex flex-col root-color">
              <img
                src={
                  'https://rich143.com/static/media/updatedlogo.778bb66b8ac72949874f0c8180098037.svg'
                }
                alt="profile"
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`w-[100%] h-screen  ${showSelectedUserBtn ? 'inline-block' : 'hidden'} md:inline-block  md:w-[60%] lg:w-[76%]`}
        >
          <ChatUser />

          <PreviewSendingInfo />

          <div
            className={`custom-margin  bg-gray-200
              ${showReplay || showShortcut ? '  md:max-h-[63vh] lg:max-h-[67vh]' : 
                PreviewImage ? 'max-h-[20vh] md:max-h-[0vh] lg:max-h-[0vh]' :
                
                'md:max-h-[69vh] lg:max-h-[80vh]'}`}
          >
            {!PreviewImage && (
              <Messages
                // setfirst={setfirst}
                // first={first}
                // socket={socket}
                setShowReplayBox={setShowReplayBox}
                ShowReplayBox={ShowReplayBox}
              />
            )}
          </div>

          <div className=" w-full fixed bottom-0 md:static md:bottom-0 lg:static lg:z-0 ">
            <ReplayMessage />
            <ShowShortcut />
            {/* <MessageSend setfirst={setfirst} first={first} socket={socket} /> */}
            <MessageSend socket={socket} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;

import { useDispatch, useSelector } from 'react-redux';
import { showSelectedUser } from '../../../Redux/features/selectedUser/selectedUserBtnSlice';
import {
  ManageShowTesting,
  setOtherUsers,
  setSelectedUsers,
} from '../../../Redux/features/user/userSlice';
import { useSocketContext } from '../../../context/SocketContext';
import { TiPin } from 'react-icons/ti';
import Formikform from '../../HelpersComponents/Form';
import { RxDragHandleDots2 } from 'react-icons/rx';
// import { toast, ToastContainer } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

GET_SELECTED_USERS_MASSAGES_API;
import { GetSelectedUserMessages } from '../../../utils/messageApiCall';
import {
  setLoadingMessages,
  setMessage,
} from '../../../Redux/features/message/messageSlice';
import { useEffect, useState } from 'react';
import { base_url } from '../../../utils/api_config';
// import { useGetSocketMessage } from '../../../context/useGetSocketMessage';
import socketIOClient from 'socket.io-client';
import { GET_SELECTED_USERS_MASSAGES_API } from '../../../services/messages.service';
import { formatWhatsAppDate } from '../../../helpers/helpers';
import socket from '../../../utils/Socket';
const SingleUser = ({ data, title, abc }) => {
  const info = JSON.parse(localStorage.getItem('info') || '{}');
  const { _id, email, mobile, name, role } = info;

  // const [message, setMessage] = useState([]);
  const [Create_roomId, setCreate_roomId] = useState('');
  const otherUsers = useSelector((state) => state.user.otherUsers);

  const darkMode = useSelector((state) => state.darkTheme.value);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const [testing, settesting] = useState([]);
  const messages = useSelector((state) => state.message.messages);

  // let noReadedId = messages.filter((msg) => !msg.isRead).map((msg) => msg._id);

  // console.log('noReadedId', messages);

  const { socket1, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(data._id);
  const dispatch = useDispatch();

  const handleSelectedUser = async (test) => {
    const receiverId = data?.userId;

    // setCreate_roomId(`${_id}-${receiverId}`);

    let ress = socket.emit('user_connected', test);

    let roomId = `${_id}-${receiverId}`;
    socket.emit('join_room', roomId);

    // socket.emit('get_messages', `${'61fbd0cd41b0d43022cabf27'}-${receiverId}`);
    socket.emit('get_messages', roomId);

    socket.on('chat_history', async (data) => {
      console.log('data', data);

      dispatch(setMessage(data));
    });

    dispatch(setSelectedUsers(data));

    socket.on('chat_history', async (data) => {
      dispatch(setMessage(data));
    });

    dispatch(showSelectedUser(true));

    socket.on('user_counter_reset', (updatedUser) => {
      const updatedList = otherUsers.map((user) =>
        user._id === updatedUser?._id ? updatedUser : user
      );

      dispatch(setOtherUsers(updatedList));
    });

    socket.on('messages_read', (updatedUser) => {
      const updatedList = otherUsers.map((user) =>
        user._id === updatedUser?._id ? updatedUser : user
      );
      dispatch(setOtherUsers(updatedList));
    });
    return () => {
      socket.off('user_counter_reset');
      socket.off('messages_read');
    };
  };

  return (
    <>
      <div
        className={`flex border p-2 ${
          darkMode
            ? selectedUser?._id == data?._id
              ? 'bg-slate-700'
              : 'bg-slate-900'
            : selectedUser?._id == data?._id
              ? 'bg-slate-200'
              : 'bg-white'
        } rounded-md my-2 items-center justify-between`}
        onClick={() => handleSelectedUser(data?._id)}
      >
        {/* Profile Image */}
        <img
          src={'./images/default_profile.png'}
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Middle Content */}
        <div className="flex-1 min-w-0 mx-3">
          <div className="text-lg last-message-font truncate">
            {data?.userName}
          </div>
          <div className="font-sizes last-message-font text-gray-500 truncate">
            {data?.mobile}
          </div>
          <div className="font-sizes text-emerald-600 truncate">
            {data?.lastMess}
          </div>
        </div>

        {/* Right Side: Pin, Date, Counter */}
        <div className="flex flex-col items-end pe-2 justify-between h-full space-y-1 min-w-[60px]">
          {data.userPin === 1 && <TiPin className="text-xl text-black" />}
          <span className="text-xs text-neutral-600 whitespace-nowrap">
            {formatWhatsAppDate(data.dateTimestamp)}
          </span>
          {data.counter > 0 && (
            <span className="text-xs bg-green-500 text-white font-bold rounded-full px-2 py-0.5">
              {data.counter}
            </span>
          )}
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default SingleUser;

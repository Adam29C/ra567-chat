import { useDispatch, useSelector } from 'react-redux';
import MessageLoader from '../../Loader/MessageLoader';
import SingleMessage from './SingleMessage';
import { useEffect, useState } from 'react';
import { GetSelectedUserMessages } from '../../../utils/messageApiCall';
import toast, { Toaster } from 'react-hot-toast';
import { setMessage } from '../../../Redux/features/message/messageSlice';
import { base_url } from '../../../utils/api_config';
import socketIOClient from 'socket.io-client';
import { GetSOketChatHistory } from '../../../utils/Socket.Io';
import socket from '../../../utils/Socket';
import { setOtherUsers } from '../../../Redux/features/user/userSlice';
import { useRef } from 'react';
// import useGetSocketMessage from '../../../context/useGetSocketMessage';
const Messages = ({ first, ShowReplayBox, setShowReplayBox }) => {
  const { _id, email, mobile, name, role } = JSON.parse(
    localStorage.getItem('info')
  );
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [groupedMessages, setGroupedMessages] = useState([]);
  const [tewsting, settewsting] = useState([]);

  const darkMode = useSelector((state) => state.darkTheme.value);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  const messages = useSelector((state) => state.message.messages);
  const otherUsers = useSelector((state) => state.user.otherUsers);

  let noReadedId = messages.filter((msg) => !msg.isRead).map((msg) => msg._id);

  const loadingMessages = useSelector((state) => state.message.loadingMessages);

  const dispatch = useDispatch();

  useEffect(() => {
    const receiverId = selectedUser.userId;
    const roomId = `${_id}-${receiverId}`;
    socket.emit('join_room', roomId);

    const handleChatHistory = (data) => {
      console.log('data', data);
      dispatch(setMessage(data));
    };

    socket.on('chat_history', handleChatHistory);

    return () => {
      socket.off('chat_history', handleChatHistory);
    };
  }, [selectedUser]);

  // const adada = async () => {
  //   let receiverId = selectedUser.userId;

  //   socket.emit('join_room', `${_id}-${receiverId}`);

  //   socket.on('chat_history', async (data) => {
  //     console.log('data', data);

  //     dispatch(setMessage(data));
  //   });

  //   // await GetSOketChatHistory(selectedUser, _id, (response) => {
  //   //   console.log('response', response);

  //   //   // dispatch(setMessage(response));
  //   //   // dispatch(setMessage([...messages, response]));
  //   // });

  //   // console.log('`${_id}-${receiverId}`', `${_id}-${receiverId}`);

  //   // socket.emit('get_messages', `${_id}-${receiverId}`);

  //   // socket.on('chat_history', async (data) => {
  //   //   dispatch(setMessage(data));
  //   // });

  //   return () => {
  //     socket.off('chat_history', handleChatHistory);
  //   };
  // };

  // useEffect(() => {
  //   adada();
  // }, [selectedUser]);

  // const groupByDate = () => {
  //   const grouped = messages
  //     ?.reduce((acc, msg) => {
  //       const date = msg.createTime.split('T')[0]; // "YYYY-MM-DD"
  //       if (!acc[date]) acc[date] = [];
  //       acc[date].push(msg);
  //       return acc;
  //     }, {})
  //     .filter((item, index, array) => array.map((i) => i._id !== item._id));

  //   const dates = Object.keys(grouped).sort();

  //   // Save dates (for rendering sections)
  //   settewsting(dates);

  //   // If needed, also save grouped data
  //   setGroupedMessages(grouped);
  // };

  // console.log('messages', messages);

  const groupByDate = () => {
    const grouped = messages.reduce((acc, msg) => {
      const date = msg.createTime.split('T')[0];
      acc[date] ??= [];
      const i = acc[date].findIndex((m) => m._id === msg._id);
      i === -1
        ? acc[date].push(msg)
        : new Date(msg.updatedTime) > new Date(acc[date][i].updatedTime) &&
          (acc[date][i] = msg);
      return acc;
    }, {});

    const dates = Object.keys(grouped).sort();

    // Save dates (for rendering sections)
    // settewsting(dates);

    // If needed, also save grouped data
    setGroupedMessages(grouped);
  };

  useEffect(() => {
    groupByDate();
  }, [messages]);

  // const handleClick = () => {
  //   const targetElement = document.getElementById('scroll-down');

  //   if (targetElement) {
  //     targetElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  // console.log('noReadedId', noReadedId);
  // const room_ID = `${_id}-${selectedUser?.userId}`;
  // useEffect(() => {
  //   console.log(' { room: roomId, messageIds: noReadedId }', {
  //     room: room_ID,
  //     messageIds: noReadedId,
  //   });
  //   // socket.emit('mark_read', { room: room_ID, messageIds: noReadedId });
  // }, [room_ID]);

  // console.log('groupedMessages', groupedMessages);


  return (
    <>
      <div
        className={`${messages?.length <= 0 ? 'testing-pdd' : 'pt-10 md:pt-[60px] lg:pt-[25px] mb-[35px]'}   `}
        // style={{ minHeight: 'calc(89vh - 10vh)' }}

        style={{ minHeight: '' }}
      >
        {loadingMessages ? (
          <MessageLoader />
        ) : (
          <>
            {messages?.length <= 0 ? (
              <div className="w-full  flex items-center justify-center ttttttttt">
                <p className="text-base md:text-xl lg:text-2xl">
                  Say! Hi to start the conversation
                </p>
              </div>
            ) : (
              groupedMessages && (
                <>
                  {Object.keys(groupedMessages)
                    .sort()
                    .map((date) => (
                      <div
                        key={date}
                        className={`${groupedMessages[date].length < 2 ? 'ttttttttt' : ''}`}
                      >
                        <div className=" flex items-center justify-center  ">
                          <span className="bg-gray-300 rounded-lg  px-3 py-1 gap-3">
                            {date}
                          </span>
                        </div>

                        {groupedMessages[date]?.map((item, index) => (
                          <SingleMessage
                            key={item._id || index}
                            data={item}
                            setShowReplayBox={setShowReplayBox}
                          />
                        ))}
                      </div>
                    ))}
                </>
              )
            )}
          </>
        )}
      </div>

      <Toaster />
    </>
  );
};

export default Messages;

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import smoothscroll from 'smoothscroll-polyfill';
import { FaCheckDouble, FaChevronDown, FaCircleNotch } from 'react-icons/fa';
import { GoCircleSlash } from 'react-icons/go';
import Pophover from '../../HelpersComponents/Pophover';
import {
  GetSocketRemoveMessage,
  GetSOketChatHistory,
} from '../../../utils/Socket.Io';
import socketIOClient from 'socket.io-client';
import {
  addMessage,
  setMessage,
} from '../../../Redux/features/message/messageSlice';
import DialogBox from '../../HelpersComponents/DialogBox';
import { MdOutlineMessage } from 'react-icons/md';
import Search from '../Sidebar/Search';
import SingleUser from '../Sidebar/SingleUser';
import {
  VisiblityReplay,
  ManageReplayDetails,
} from '../../../Redux/features/user/userSlice';
import { FiMessageCircle } from 'react-icons/fi';
import { base_url } from '../../../utils/api_config';
import socket from '../../../utils/Socket';
import { changeDateFormat } from '../../../helpers/helpers';

const SingleMessage = ({ data, setShowReplayBox, dates, groupedMessages }) => {
  const { _id, email, mobile, name, role } = JSON.parse(
    localStorage.getItem('info')
  );

  const messages = useSelector((state) => state.message.messages);

  // console.log('messages', messages);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [forwordmsg, setforwordmsg] = useState('');
  const [MsgId, setMsgId] = useState('');

  const darkMode = useSelector((state) => state.darkTheme.value);
  const authUser = useSelector((state) => state.user);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const details = useSelector((state) => state.user.details);

  const scroll = useRef();
  const [hover, setHover] = useState(false);

  const createdAt = new Date(data.createTime);
  const formatedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const ShowHiddenTabs = () => {
    setOpen(!open);
  };

  useEffect(() => {

    let room_ID = `${_id}-${selectedUser.userId}`;
    socket.emit('message_receive', room_ID);

    const handleMessage = (data) => {
      console.log('datadatadata21212', data);

      dispatch(addMessage(data));
    };

    socket.on('latest_message', handleMessage);

    // const handleMessage = async (data) => {
    //   console.log('data', data);

    //   dispatch(addMessage(data));
    // };

    // socket.off('receive_message');
    // socket.on('receive_message', handleMessage);

    return () => {
      socket.off('message_receive');
      socket.off('latest_message');
    };
  }, [socket, _id, selectedUser?.userId]);

  const DeleteMessages = async () => {
    if (window.confirm('Do You Really Want To Remove This')) {
      GetSocketRemoveMessage(selectedUser, _id, data);

      socket.on('message_deleted', (data) => {
        dispatch(addMessage(data));
      });
      setOpen(!open);
    }
  };

  const manageReplay = () => {
    dispatch(
      ManageReplayDetails({
        message: data?.message,
        username: _id === data.sender ? 'You' : selectedUser.userName,
      })
    );
    dispatch(VisiblityReplay(true));
  };

  let abc = [];
  const selectUsers = (item) => {
    abc.push(item.userId);
  };

  let msgID = '';
  const forwordMessage = (messageId) => {
    document.getElementById('my_modal_5').showModal();
    // console.log('forwordmsg', messageId._id);
    msgID += messageId._id;
    setforwordmsg(messageId.message);
    setMsgId(messageId._id);
    setOpenModal(!OpenModal);
  };

  const MessageForword = () => {
    socket.emit('forward_message', {
      messageId: data._id,
      sender: _id,
      receivers: abc,
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      // Give React a tick to render all elements before trying to scroll
      setTimeout(() => {
        const targetElement = document.getElementById('scroll-down');
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Short delay ensures DOM has rendered
    }
  }, [messages]);

  return (
    <div>
      <div id="scroll-up"></div>

      <div>
        <Pophover
          customClass={
            _id === data.sender ? ' top-5  right-5' : ' left-5 top-5'
          }
          setOpen={setOpen}
          open={open}
          body={
            <>
              {_id === data.sender && (
                <li className="px-3 py-1" onClick={() => DeleteMessages(data)}>
                  Delete
                </li>
              )}
              <li className="px-3 py-1" onClick={() => manageReplay()}>
                Reply
              </li>
              <li className="px-3 py-1" onClick={() => forwordMessage(data)}>
                Forword
              </li>
            </>
          }
        />

        <div
          className={`chat bg-gray-200   ${_id === data.sender ? 'chat-end bg-dark' : 'chat-start'}`}
        >
          <>
            {
              _id === data.sender && data?.replyName != null ? (
                <>
                  <div className="mb-2 max-w-[80%] self-end">
                    <div
                      className="bg-gray-100   border-l-4  rounded-t-md px-3 py-1"
                      style={{
                        borderLeft: '4px solid',
                        borderImage:
                          'linear-gradient(97.51deg, #1c3e35 -39.91%, #4aa48c 117.67%) 1',
                      }}
                    >
                      <p className="text-xs font-semibold text-gray-600">
                        You replied to{' '}
                        {data.replyName != null && data.replyName}
                      </p>
                      <p className="text-sm text-gray-800 truncate">
                        {data?.replyMessage}
                      </p>
                    </div>
                    <div className="replay-message-bg bg-green-500 text-white rounded-b-md rounded-tr-md px-4 py-1 ">
                      {data?.message}
                    </div>
                    <div className="chat-footer text-xs text-right  text-gray-600 ">
                      {formatedTime}
                    </div>
                  </div>
                </>
              ) : (
                // {data.replyName == null && (
                <>
                  <div
                    className={`max-w-[50%] chat-bubble relative px-4 py-2 flex items-center gap-2 shadow-md transition duration-200 
  ${'isSender' == 'isSender' ? 'bg-blue-500 text-white' : darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <span className="flex-grow w-full  custom-message-font-size">
                      <div className="flex justify-end">
                        {!data.isDeleted && hover && (
                          <FaChevronDown
                            onClick={ShowHiddenTabs}
                            className="opacity-100 right-0 transition-opacity duration-[2000ms] ease-in-out"
                          />
                        )}
                      </div>

                      {data.images.length > 0 && data.message === '' && (
                        <img
                          src={data.images[0]}
                          alt=""
                          height={20}
                          width={200}
                        />
                      )}
                      {data.isDeleted ? (
                        <>
                          <i className="flex items-center  text-xs">
                            <GoCircleSlash />
                            {data.message !== '' && data?.message}
                          </i>
                        </>
                      ) : (
                        data.message !== '' && data?.message
                      )}
                    </span>
                  </div>

                  <div className="chat-footer text-xs text-gray-500">
                    {formatedTime}
                  </div>
                </>
              )
              // )}
            }

            {/* {_id !== data.sender ? (
              ''
            ) : (
              <FaCheckDouble color={data.isRead ? 'grey' : 'blue'} />
            )} */}
          </>
        </div>

        <dialog id="my_modal_5" className="modal  modal-middle">
          <div className="modal-box md:w-[1200px] h-[1200px] flex flex-col">
            <div className="flex justify-between items-center border-b-2 border-darks-600">
              <h3 className="font-bold text-lg">Hello!</h3>
              <div className="modal-action ">
                <form method="dialog" className="modal-action ">
                  <span className="btn w-sm">X</span>
                </form>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul class="divide-y divide-gray-200">
                {otherUsers?.map((item, index) => (
                  <li class="flex items-center justify-between py-2">
                    <div class="flex items-center">
                      <div class="w-8 h-8 main-bg rounded-full flex items-center justify-center text-white text-sm mr-3">
                        <svg
                          class="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.121 17.804A4 4 0 0112 15h0a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span class="text-gray-800 text-sm">
                        {item?.userName}
                        {/* {console.log('forwordmsg', forwordmsg)}
                      {forwordmsg ? JSON.stringify(forwordmsg) : "null"} */}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      onChange={() => selectUsers(item)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t mt-4 pt-4 flex justify-end gap-2">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
              <button
                className="btn btn-primary"
                onClick={() => MessageForword()}
              >
                Submit
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <div id="scroll-down"></div>
    </div>
  );
};

export default SingleMessage;

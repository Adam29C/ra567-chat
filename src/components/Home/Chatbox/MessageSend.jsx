import { useState, useEffect, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
// import { SendMessages } from '../../../utils/messageApiCall';
import { FaPlus } from 'react-icons/fa';
import { IoImagesOutline } from 'react-icons/io5';
import { MdOutlineEmojiEmotions, MdSpatialAudioOff } from 'react-icons/md';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
// import { toast, Toaster } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
// import { sendMessages } from '../../../Redux/features/message/messageSlice';
import { base_url } from '../../../utils/api_config';
import socketIOClient from 'socket.io-client';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { AiOutlineAudio } from 'react-icons/ai';
import { IoVideocamOutline } from 'react-icons/io5';
import PreviewSendingInfo from './PreviewSendingInfo';
import { convertTimestamp } from '../../../utils/date.config';
import {
  VisiblityPreviewImage,
  VisiblityReplay,
  UploadDocument,
  VisiblityShortcut,
  VisiblityFilterdShortcut,
} from '../../../Redux/features/user/userSlice';
import Pophover from '../../HelpersComponents/Pophover';
import {
  FOR_POST_REQUEST,
  GET_UPLOAD_DOCUMENT_LINK,
} from '../../../services/common.service';
import { apiRoutes } from '../../../utils/apiRoutes';
import logger from 'redux-logger';
import socket from '../../../utils/Socket';
import { RepalyMessages, SendMessages } from '../../../utils/Socket.Io';
import {
  addMessage,
  setMessage,
} from '../../../Redux/features/message/messageSlice';

const MessageSend = ({ setfirst }) => {
  const modalRef = useRef(null);
  const { _id, email, mobile, name, role } = JSON.parse(
    localStorage.getItem('info')
  );
  const details = useSelector((state) => state.user.details);

  const [showModal, setShowModal] = useState(false);
  const [message121, setMessage121] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const darkMode = useSelector((state) => state.darkTheme.value);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const showShortcut = useSelector((state) => state.user.showShortcut);

  const showReplay = useSelector((state) => state.user.showReplay);
  const gertfilterdShortcut = useSelector(
    (state) => state.user.gertfilterdShortcut
  );

  // console.log('gertfilterdShortcut', gertfilterdShortcut);
  // console.log('message121', message121);

  const messages = useSelector((state) => state.message.messages);

  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const VideofileInputRef = useRef(null);

  const setSendMessages = async (e) => {
    const inputValue = e.target.value;
    setMessage121(inputValue);

    if (inputValue.startsWith('/') && inputValue.length > 1) {
      const response = await FOR_POST_REQUEST(
        apiRoutes.FETCH_SHORTCUT_MSGS_LIST,
        { term: inputValue }
      );

      dispatch(VisiblityFilterdShortcut(response.returnArr));
      dispatch(VisiblityShortcut(true));
    } else {
      dispatch(VisiblityShortcut(false));
    }
  };

  const tst = () => {
    if (gertfilterdShortcut && gertfilterdShortcut.message) {
      setMessage121(gertfilterdShortcut.message);
    }
  };
  useEffect(() => {
    tst();
  }, [gertfilterdShortcut]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (showShortcut) {
      SendMessages(selectedUser, _id, message121, name);
      setMessage121('');
      dispatch(VisiblityShortcut(false));
    } else if (showReplay) {
      RepalyMessages(selectedUser, _id, message121, name, details);
      setMessage121('');
      dispatch(VisiblityReplay(false));
      return;
    } else {
      SendMessages(selectedUser, _id, message121, name);
      let room_ID = `${_id}-${selectedUser.userId}`;
      socket.emit('message_receive', room_ID);

      const handleMessage = (data) => {
        dispatch(addMessage(data));
      };

      socket.on('latest_message', handleMessage);

      setMessage121('');

      return () => {
        socket.off('latest_message', handleMessage);
      };
    }
    dispatch(VisiblityReplay(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setPickerVisible(!isPickerVisible);
      }
    };

    if (isPickerVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerVisible]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');

    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) return;

    const mediaUrl = URL.createObjectURL(file);
    const formData = new FormData();

    let abc = isVideo ? 'videos' : 'images';

    formData.append(abc, file);

    const response = await GET_UPLOAD_DOCUMENT_LINK(
      apiRoutes.GET_UPLOAD_DOCUMENT_LINK,
      formData
    );

    setImage(mediaUrl);
    dispatch(VisiblityPreviewImage(true));
    dispatch(
      UploadDocument({
        file: isVideo ? response.data.videos[0] : response.data.images[0],
        fileType: isVideo ? 'video' : 'image',
      })
    );
  };

  return (
    <>
      <form onSubmit={handleSendMessage}>
        <div
          className={`  h-[10vh] w-full flex justify-center items-center ${darkMode ? 'bg-slate-900' : 'bg-gray-200'}  `}
          ref={modalRef}
        >
          {isPickerVisible && (
            <div className="absolute bottom-20 md:bottom-32 lg:bottom-20 ">
              <Picker
                data={data}
                previewPosition="none"
                onEmojiSelect={(e) => {
                  // setCurrentEmoji(e.native);
                  setMessage121(message121 + e.native);
                }}
              />
            </div>
          )}
          <div
            className={` send-button w-[90%] sm:w-[50%] md:w-[50%] lg:w-[50%]  flex justify-between items-center ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-full shadow`}
          >
            <button
              className={`${darkMode ? 'bg-slate-700 hover:bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-300'} rounded-full  p-2 mx-1`}
              onClick={() => setPickerVisible(!isPickerVisible)}
              type="button"
            >
              <MdOutlineEmojiEmotions className="text-2xl" />
            </button>

            <div className="w-[90%] ml-0 mr-2 my-2 ">
              <input
                type="text"
                name="message"
                value={message121}
                onChange={(e) => setSendMessages(e)}
                placeholder="Message"
                className={`outline-none py-1 px-2 rounded w-full bg-transparent`}
              />
            </div>
            {loading ? (
              <span className="flex items-center justify-center bg-blue-600 text-white rounded-full p-2 mx-1">
                <span className="loading loading-spinner"></span>
              </span>
            ) : (
              <>
                {/* <div className="relative">
                  <button
                    // ref={btnRef}
                    className="p-2 me-5"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <FaPlus className="text-2xl" />
                  </button>
                </div> */}

                <div className="dropdown">
                  <div tabIndex={0} role="span" className="bg-transparent px-6 m-1">
                    <FaPlus className="text-2xl" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm"
                    style={{ bottom: '100%' }}
                  >
                    <div className="px-3 flex items-center">
                      <IoImagesOutline className="text-lg" />
                      <li
                        className="flex items-center py-1"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <span className="mx-2 rounded-md">Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageUpload(e);
                            setOpen(false);
                          }}
                          ref={fileInputRef}
                          className="hidden"
                        />
                      </li>
                    </div>

                    <div className="px-3  flex items-center">
                      <IoVideocamOutline className="text-lg" />
                      <li
                        className="flex items-center"
                        onClick={() => VideofileInputRef.current.click()}
                      >
                        <span className="mx-2 rounded-md">Video</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            handleImageUpload(e);
                            setOpen(false);
                          }}
                          ref={VideofileInputRef}
                          className="hidden"
                        />
                      </li>
                    </div>
                  </ul>
                </div>

                {/* <details className="dropdown">
                  <summary className="btn m-1">
                    <FaPlus className="text-2xl" />
                  </summary>
                  <ul
                    className="menu dropdown-content bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm"
                    style={{ bottom: '100%' }}
                  >
                    <div className="px-3 flex items-center">
                      <IoImagesOutline className="text-lg" />
                      <li
                        className="flex items-center py-1"
                        // onClick={() => fileInputRef.current.click()}
                      >
                        <span className="mx-2 rounded-md">Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageUpload(e);
                            setOpen(false);
                          }}
                          ref={fileInputRef}
                          className="hidden"
                        />
                      </li>
                    </div>

                    <div className="px-3  flex items-center">
                      <IoVideocamOutline className="text-lg" />
                      <li
                        className="flex items-center"
                        onClick={() => VideofileInputRef.current.click()}
                      >
                        <span className="mx-2 rounded-md">Video</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            handleImageUpload(e);
                            setOpen(false);
                          }}
                          ref={VideofileInputRef}
                          className="hidden"
                        />
                      </li>
                    </div>
                  </ul>
                </details> */}

                <button
                  className={`${message121 == '' ? 'diable-send-button-color' : 'send-button-color'}   rounded-full text-white p-2 mx-1`}
                  onClick={handleSendMessage}
                  disabled={message121 === ''}
                >
                  <IoMdSend className="text-2xl " />
                </button>
              </>
            )}
          </div>
        </div>
      </form>
      {/* {open && (
        <Pophover
          customClass={' right-[5.25rem]  bottom-[2.25rem]'}
          setOpen={setOpen}
          open={open}
          body={
            <>
              <li
                className="px-3 flex items-center py-1"
                onClick={() => fileInputRef.current.click()}
              >
                <IoImagesOutline />
                <span className="mx-2 rounded-md">Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageUpload(e);
                    setOpen(false);
                  }}
                  ref={fileInputRef}
                  className="hidden"
                />
              </li>

              <li
                className="px-3 flex items-center py-1"
                onClick={() => VideofileInputRef.current.click()}
              >
                <IoVideocamOutline />
                <span className="mx-2 rounded-md">Video</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    handleImageUpload(e);
                    setOpen(false);
                  }}
                  ref={VideofileInputRef}
                  className="hidden"
                />
              </li>
              <li
                className="px-3 flex items-center  py-1"
                // onClick={() => setOpenModal(!OpenModal)}
              >
                <MdSpatialAudioOff />
                <span className="mx-2 rounded-md">Audio</span>
              </li>
            </>
          }
        />
      )} */}

      <Toaster />
    </>
  );
};

export default MessageSend;

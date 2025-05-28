import { useState, useEffect, useRef } from 'react';
import ChatUserProfile from './ChatUserProfile';
import { IoMdArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { showSelectedUser } from '../../../Redux/features/selectedUser/selectedUserBtnSlice';
import { useSocketContext } from '../../../context/SocketContext';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { RiMoonClearLine, RiSettings2Line } from 'react-icons/ri';
import { IoLocationOutline, IoVideocamOutline } from 'react-icons/io5';
import { AiOutlineAudio } from 'react-icons/ai';
import { useFormik } from 'formik';
import { TbPhoneCalling } from 'react-icons/tb';

import ReusableForm from '../../HelpersComponents/Form';
import DialogBox from '../../HelpersComponents/DialogBox';
import {
  FOR_GET_LIST,
  FOR_POST_REQUEST,
  FOR_UPDATE_REQUEST,
} from '../../../services/common.service';
import { apiRoutes } from '../../../utils/apiRoutes';
import toast from 'react-hot-toast';
import {
  setOtherUsers,
  VisiblityPreviewImage,
} from '../../../Redux/features/user/userSlice';
import { GET_ALL_USERS_URI_API } from '../../../services/users.service';
import PreviewSendingInfo from './PreviewSendingInfo';
import {
  Get_Year_With_Time,
  Get_Year_With_Time_With_Column_Saprate,
} from '../../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
const ChatUser = ({ abcd }) => {
  // console.log('abcd', abcd);
  const navigate = useNavigate();
  const { _id, email, mobile, name, role } = JSON.parse(
    localStorage.getItem('info')
  );
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [GetUpiList, setGetUpiList] = useState([]);

  // console.log('GetUpiList', GetUpiList);

  const [GetBankList, setGetBankList] = useState([]);
  const [OpenModal, setOpenModal] = useState(false);

  const [showChatUser, setShowChatUser] = useState(false);
  const darkMode = useSelector((state) => state.darkTheme.value);
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const otherUsers = useSelector((state) => state.user.otherUsers);

  // console.log('selectedUser', selectedUser);

  const messages = useSelector((state) => state.message.messages);

  let noReadedId = messages.filter((msg) => !msg.isRead).map((msg) => msg._id);

  // console.log('cjaj users =' ,noReadedId);

  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedUser._id);
  const dispatch = useDispatch();

  const handleHideChatUser = (data) => {
    setShowChatUser(data);
  };

  const handleProfileBackBtn = () => {
    dispatch(showSelectedUser(false));
    // setShowChatUser(false);
  };

  const menuBtn = () => {
    setOpen(!open);
  };

  const handleAccountBtn = () => {
    setOpen(false);
  };

  const handleLogOutBtn = () => {
    setOpenModal(true);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && btnRef.current) {
        if (
          !menuRef.current.contains(e.target) &&
          !btnRef.current.contains(e.target)
        ) {
          setOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleImageUpload = (event) => {
    console.log('testtt');
    alert();
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }

    dispatch(VisiblityPreviewImage(true));

    // dispatch(VisiblityPreviewImage(true));
  };

  const getUpiList = async () => {
    const res = await FOR_GET_LIST(apiRoutes.GET_UPI_LIST);

    console.log('res', res.message.data);

    setGetUpiList(res.message.data);

    const res1 = await FOR_GET_LIST(apiRoutes.GET_BANK_LIST);
    setGetBankList(res1.data);
  };

  useEffect(() => {
    getUpiList();
  }, []);

  const formik = useFormik({
    initialValues: {
      userId: '',
      type: '1',
      amount: '',
      paymenttype: 'UPI',
      upiId: '',
      refrenceNumber: '',
    },

    validate: (values) => {
      const errors = {};

      if (!values.amount) {
        errors.amount = 'amount is required';
      } else if (parseInt(values.amount) < 10) {
        errors.amount = 'amount must have grater  then 10';
      }

      if (!values.upiId) {
        errors.upiId = 'Please Select UPI';
      }

      if (!values.paymenttype) {
        errors.paymenttype = 'Please Select Type';
      }
      if (!values.refrenceNumber) {
        errors.refrenceNumber = 'Please Enter Refrence Number';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        userId: selectedUser?.userId,
        type: values.type,
        amount: values.amount,
        paymenttype: values.paymenttype,
        upiId: values.upiId,
        refrenceNumber: values.refrenceNumber,
      };

      const response = await FOR_POST_REQUEST(apiRoutes.ADD_POINT_URI, payload);

      console.log('response.status', response);

      if (response.message.status === 'Success') {
        setOpenModal(false);
        toast.success(response.message.message, {
          position: 'top-center',
        });
      } else if (response.data.status === 0) {
        setOpenModal(false);

        toast.error(response.data.message, {
          position: 'top-center',
        });
      } else {
        setOpenModal(false);

        toast.error(response.data.message, {
          position: 'top-center',
        });
      }
    },
  });

  const fields = [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      label_size: 12,
      default: 'Open',
      col_size: 3,
      options: [
        {
          label: 'Credit(Deposit)',
          value: '1',
        },
        {
          label: 'Debit(Withdrwal)',
          value: '2',
        },
      ],
    },
    {
      name: 'amount',
      label: 'Amount:',
      type: 'text',
      label_size: 12,
      col_size: 12,
      display: true,
    },
    {
      name: 'paymenttype',
      label: 'Particular',
      type: 'select',
      label_size: 12,

      col_size: 3,
      options:
        (GetBankList &&
          GetBankList.map((item) => ({
            label: item.name,
            value: item.bankName,
          }))) ||
        [],
    },
    {
      name: 'upiId',
      label: 'UPI List',
      type: 'select',
      label_size: 12,

      col_size: 3,
      options:
        (GetUpiList &&
          GetUpiList.map((item) => ({
            label: item.UPI_ID,
            value: item._id,
          }))) ||
        [],
    },

    {
      name: 'refrenceNumber',
      label: 'Reference Number:',
      type: 'text',
      label_size: 12,
      col_size: 12,
      display: true,
    },
  ];

  // PING USER

  const PingUsers = async () => {
    const payload = {
      id: selectedUser._id,
      isPinged: selectedUser.userPin === 0 ? true : false,
    };

    const response = await FOR_UPDATE_REQUEST(
      apiRoutes.PING_USERS_UPI,
      payload
    );

    if (response.status === 'success') {
      // const res = await GET_ALL_USERS_URI_API();

      // dispatch(setOtherUsers(res?.data.users));
      setOpenModal(false);
      toast.success(response.message, {
        position: 'top-center',
      });
    }
  };

  // console.log('noReadedId', noReadedId);
  // const room_ID = `${_id}-${selectedUser?.userId}`;
  // useEffect(() => {
  //   console.log(' { room: roomId, messageIds: noReadedId }', {
  //     room: room_ID,
  //     messageIds: noReadedId,
  //   });
  //   // socket.emit('mark_read', { room: room_ID, messageIds: noReadedId });
  // }, [room_ID]);

  // const showTesting = useSelector((state) => state.user.showTesting);

  // console.log('showTesting', showTesting);

  // const CallUsers = () => {
  //   // navigate('https://chatit.minidog.club/main');

  //   window.location.href = 'https://chatit.minidog.club/main?';
  // };

  return (
    <>
      <div
        className={`sh-[11vh] h-fit md:h-[9vh] lg:h-[9vh] w-full p-3 md:p-0 flex items-center justify-between  ${darkMode ? 'bg-slate-950 border-l-0 md:border-l-2 border-gray-700' : 'border-none bg-white'} fixed top-0 z-10 md:static lg:static`}
      >
        <div className="flex items-center">
          <button
            className={`d-flex justify-center items-center md:hidden lg:hidden p-1 ${darkMode ? 'bg-blue-950' : 'bg-gray-200'} rounded-full  text-xl `}
            onClick={handleProfileBackBtn}
          >
            <IoMdArrowBack />
          </button>
          <div
            className={`w-[100%] md:w-[90%] lg:w-[100%] h-[80%] mx-3 flex justify-center  px-2 py-1 items-center space-x-3  ${darkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-gray-100 hover:bg-gray-200 '} rounded-md `}
          >
            <div className={`avatar  hidden  sm:block`}>
              <div className="w-12 rounded-full profile-img  ">
                <img
                  src={'./images/default_profile.png'}
                  alt="profile"
                  className=""
                />
              </div>
            </div>
            <div>
              <h1 className="text- add-point-btn1">{selectedUser.userName}</h1>
              <span className="text- font-sizes m-0">
                {selectedUser.mobile}
              </span>

              <br />
              <span
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} font-sizes`}
              >
                Last Seen -{' '}
                {Get_Year_With_Time_With_Column_Saprate(selectedUser.lastSeen)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center">
            {/* <div onClick={() => CallUsers()} className="p-1">
              <TbPhoneCalling className="text-2xl" />
            </div> */}
            <button
              ref={btnRef}
              onClick={() => handleLogOutBtn()}
              className="send-button-color rounded text-white p-1  add-point-btn"
            >
              Add Point
            </button>
            <button ref={btnRef} className="p-1 ms-2" onClick={menuBtn}>
              <RxDragHandleDots2 className="text-2xl" />
            </button>
          </div>
          {open && (
            <div className="w-40 absolute top-full right-0 p-2 shadow-2xl rounded-md z-50 bg-white ">
              <ul
                className={`flex flex-col ${darkMode ? 'text-white' : ' text-black'} py-2`}
              >
                <li
                  ref={menuRef}
                  className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center gap-x-2 text-base px-4 py-2 rounded cursor-pointer`}
                  onClick={() => PingUsers()}
                >
                  {/* <span onClick={() => PingUsers()}> */}
                  <IoLocationOutline className="text-sm" />
                  {selectedUser.userPin === 1 ? 'Unpin' : 'Pin'}
                </li>
                <li
                  ref={menuRef}
                  onClick={handleAccountBtn}
                  className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center gap-x-2 text-base px-2 rounded cursor-pointer`}
                >
                  <button onClick={() => fileInputRef.current.click()}>
                    <span className="flex items-center justify-center gap-2 p-2  rounded-md">
                      <AiOutlineAudio className="text-sm" />
                      Image
                    </span>
                    <input
                      type="file"
                      accept="image"
                      onChange={() => handleImageUpload()}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    {image && (
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src={image}
                          alt="Uploaded"
                          className="max-w-full h-auto"
                        />
                      </div>
                    )}
                  </button>
                </li>
                <li
                  ref={menuRef}
                  onClick={handleAccountBtn}
                  className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center gap-x-2 text-base px-2  rounded cursor-pointer`}
                >
                  <button onClick={() => fileInputRef.current.click()}>
                    <span className="flex items-center justify-center gap-2 p-2  rounded-md">
                      <IoVideocamOutline className="text-sm" />
                      Video
                    </span>
                  </button>
                  {/* <input
                    type="file"
                    accept="video"
                    onChange={() => handleImageUpload()}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  {image && (
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={image}
                        alt="Uploaded"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )} */}
                </li>
              </ul>
            </div>
          )}
        </div>

        <DialogBox
          title={'Update Wallet Balances'}
          modal_id={'modal-2'}
          OpenModal={OpenModal}
          setOpenModal={setOpenModal}
          body={
            <ReusableForm
              fieldtype={fields.filter((field) => !field.showWhen)}
              formik={formik}
              btn_name={'Login'}
              button_Size={'w-100'}
              show_submit={true}
            />
          }
        />
      </div>
    </>
  );
};

export default ChatUser;

import React, { useEffect, useRef, useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { RiSettings2Line } from 'react-icons/ri';
import { FaCircleNotch } from 'react-icons/fa';
import { RiMoonClearLine } from 'react-icons/ri';
import { MdOutlineMessage } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { FaTrashArrowUp } from 'react-icons/fa6';
import { FaRegMessage } from 'react-icons/fa6';
import { FaTowerBroadcast } from 'react-icons/fa6';
import { FiInfo } from 'react-icons/fi';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { showProfile } from '../../../Redux/features/profileBtn/profileBtnSlice';
import { setTheme } from '../../../Redux/features/darkTheme/darkThemeSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import DialogBox from '../../HelpersComponents/DialogBox';
import {
  FOR_DELETE_REQUEST,
  FOR_GET_LIST,
  FOR_POST_REQUEST,
  FOR_UPDATE_REQUEST,
  GET_UPLOAD_DOCUMENT_LINK,
} from '../../../services/common.service';
import { apiRoutes } from '../../../utils/apiRoutes';
import { useFormik } from 'formik';
import ReusableForm from '../../HelpersComponents/Form';
import { MdVisibility } from 'react-icons/md';
import toast from 'react-hot-toast';
// import { LoginUser } from '../../../utils/userApiCall';
import SingleUser from './SingleUser';
import Search from './Search';
import { CiSearch } from 'react-icons/ci';
import { IoCloseSharp } from 'react-icons/io5';
import { SEARCH_USERS_URI_API } from '../../../services/users.service';
import socket from '../../../utils/Socket';
const MenuComponent = () => {
  const [open, setOpen] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [getMsgList, setgetMsgList] = useState([]);
  const [SetRowData, setSetRowData] = useState([]);

  const [CreateStatus, setCreateStatus] = useState(0);
  const [search, setSearch] = useState('');
  const [userList, setuserList] = useState([]);

  // const [darkMode, setDarkMode] = useState(false);
  const otherUsers = useSelector((state) => state.user.otherUsers);

  const darkMode = useSelector((state) => state.darkTheme.value);
  const authUser = useSelector((state) => state.user.authUser);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuBtn = () => {
    setOpen(!open);
  };

  // console.log('otherUsers', otherUsers);

  const handleAccountBtn = () => {
    setOpen(false);
    dispatch(showProfile(true));
  };
  // const handleDarkMode = (e) => {
  //   // setDarkMode(e.target.checked);
  //   localStorage.setItem('chatit_darkmode', e.target.checked);
  //   // const isDark = localStorage.getItem('chatit_darkmode');
  //   // console.log(isDark);
  //   // dispatch(setTheme(Boolean(isDark)));

  //   dispatch(setTheme(e.target.checked));
  // };

  const handleLogOutBtn = () => {
    setOpen(false);
    document.getElementById('my_modal_1').showModal();
  };
  const handleLogOutConfirmBtn = () => {
    localStorage.removeItem('chatit');
    localStorage.removeItem('chatit_darkmode');
    dispatch(setTheme(false));
    navigate('/login');
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

  // ------------ GetBroadCastList ---------------------

  const GetBroadCastList = () => {
    setCreateStatus(1);
    setOpenModal(!OpenModal);
  };

  const BrodcastMasgList = async () => {
    if (CreateStatus === 1) {
      const response = await FOR_GET_LIST(apiRoutes.GET_SHORTCUT_MSGS_LIST);

      if (response.status === 'success') {
        setgetMsgList(response.data.shortcutMessages);
      }
    } else if (CreateStatus === 4) {
      const response1 = await FOR_GET_LIST(
        apiRoutes.GET_AllBROADCAST_MSGS_LIST
      );

      if (response1.status === 'success') {
        setgetMsgList(response1.data.messages);
      }
    }
  };

  useEffect(() => {
    if (OpenModal) {
      BrodcastMasgList();
    }
  }, [OpenModal, CreateStatus]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      messKey: CreateStatus === 3 && SetRowData ? SetRowData.messKey : '',
      shortcuttype: CreateStatus === 3 && SetRowData ? SetRowData.type : '1',
      message: CreateStatus === 3 && SetRowData ? SetRowData.message : '',
      fileUrl: CreateStatus === 3 && SetRowData ? SetRowData.images : '',
    },

    validate: (values) => {
      const errors = {};

      if (!CreateStatus === 6) {
        if (!values.messKey) {
          errors.messKey = 'Message Key is required';
        } else if (!values.messKey.startsWith('/')) {
          errors.messKey = 'Message Key must start with /';
        }
      }

      if (!values.message) {
        errors.message = 'Please Enter Something';
      }
      if (!values.shortcuttype) {
        errors.shortcuttype = 'Please Select Type';
      }

      return errors;
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append('images', values.fileUrl);

      const response1 = await GET_UPLOAD_DOCUMENT_LINK(
        apiRoutes.GET_UPLOAD_DOCUMENT_LINK,
        formData
      );

      let response;

      if (CreateStatus === 6) {
        const payload = {
          productType:
            values.shortcuttype === '2'
              ? 'image'
              : values.shortcuttype === '3'
                ? 'audio'
                : 'video',
          broadcastMessage: values.message,
          fileUrl: SetRowData.fileUrl || response?.data?.images,
        };

        response = await FOR_POST_REQUEST(
          apiRoutes.CREATE_BROADCAST_MSGS_LIST,
          payload
        );




        
      } else {
        const payload = {
          messKey: values.messKey,
          shortcuttype: values.shortcuttype,
          message: values.message,
          fileUrl: SetRowData.fileUrl || response1?.data?.images,
          ...(CreateStatus === 3 ? { id: SetRowData._id } : {}),
        };

        CreateStatus === 3
          ? (response = await FOR_UPDATE_REQUEST(
              apiRoutes.UPDATE_SHORTCUT_MSGS_LIST,
              payload
            ))
          : CreateStatus === 2
            ? (response = await FOR_POST_REQUEST(
                apiRoutes.CREATE_SHORTCUT_MSGS_LIST,
                payload
              ))
            : '';
      }

      if (response.status === 'success') {
        setOpenModal(!OpenModal);
        BrodcastMasgList();

        toast.success(
          CreateStatus === 3 ? 'Update Successfully' : response.message,
          {
            position: 'top-center',
          }
        );
        formik.resetForm({
          messKey: '',
          shortcuttype: '1',
          message: '',
          fileUrl: 'UPI',
        });
      } else if (response.data.status === 0) {
        setOpenModal(!OpenModal);

        toast.error(response.data.message, {
          position: 'top-center',
        });
      } else {
        setOpenModal(!OpenModal);

        toast.error(response.data.message, {
          position: 'top-center',
        });
      }
    },
  });

  const fields = [
    {
      name: 'messKey',
      label: 'Shortcut Message Key',
      display: CreateStatus === 6 ? false : true,
      type: 'text',
      label_size: 12,
      col_size: 12,
    },
    {
      name: 'message',
      label: 'Your Message',
      type: 'msgbox',
      label_size: 12,
      display: true,
      col_size: 12,
    },
    {
      name: 'shortcuttype',
      label: 'File Type',
      type: 'select',
      label_size: 12,
      default: 'Open',

      col_size: 3,
      options: [
        {
          label: 'text',
          value: '1',
        },
        {
          label: 'Image',
          value: '2',
        },
        {
          label: 'Audio',
          value: '3',
        },
        {
          label: 'Video',
          value: '4',
        },
      ],
    },

    {
      name: 'fileUrl',
      label: 'Audio / Video',
      type: 'image',
      display: formik.values.shortcuttype == '1' ? false : true,
      label_size: 12,
      col_size: 12,
    },
  ];

  const RemoveShortcut = async (RowID) => {
    if (window.confirm('Do You Really Want To Remove This')) {
      let response;

      if (CreateStatus === 1) {
        response = await FOR_DELETE_REQUEST(
          apiRoutes.REMOVE_SHORTCUT_MSGS_LIST,
          RowID
        );
      } else {
        response = await FOR_DELETE_REQUEST(
          apiRoutes.REMOVE_BROADCAST_MSGS_LIST,
          RowID
        );
      }

      if (response.status === 'success') {
        setOpenModal(!OpenModal);
        BrodcastMasgList();

        toast.success(response.message, {
          position: 'top-center',
        });
      } else if (response.data.status === 0) {
        toast.error(response.data.message, {
          position: 'top-center',
        });
      } else {
        setOpenModal(!OpenModal);

        toast.error(response.data.message, {
          position: 'top-center',
        });
      }
    }
  };

  // ------------manage search -----------------

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };
  const handleCancelSearchBtn = () => {
    setSearch('');
    // dispatch(setOtherUsers(data));
    setuserList(userList);
  };

  const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;

    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(
          () => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args);
              lastRan = Date.now();
            }
          },
          limit - (Date.now() - lastRan)
        );
      }
    };
  };

  const getAllUser = async () => {
    console.log('socket', search);

    socket.emit('get_user_list', { page: '', limit: '', search: search });

    const handleUserList = (data) => {
      const newData = data.users || [];

      // console.log('newData', newData);

      if (newData.length > 0) {
        setuserList(newData);
        // dispatch(setOtherUsers(newData));
      } else {
        setuserList(otherUsers);
        // dispatch(setOtherUsers(otherUsers));
      }

      socket.off('user_list', handleUserList);
    };

    socket.on('user_list', handleUserList);
  };

  useEffect(() => {
    // if (search != '') {
    getAllUser();
    // }
  }, [search]);

  // console.log('userList', userList);

  return (
    <>
      <div className="relative">
        <button
          ref={btnRef}
          className={` mx-2 p-1 ${darkMode ? 'hover:bg-gray-800' : ' '} rounded-full`}
          onClick={menuBtn}
        >
          <LuMenu className="text-2xl" />
        </button>

        {open && (
          <div
            className={`w-72 absolute top-11 right-8 md:left-1 lg:left-0 ${darkMode ? 'bg-slate-800 ' : ' bg-white shadow-gray-400'} p-2 shadow-2xl  rounded-md z-50 `}
          >
            <ul
              className={`flex flex-col ${darkMode ? 'text-white' : ' text-black'} py-2`}
            >
              <li
                ref={menuRef}
                onClick={() => {
                  setOpenModal(!OpenModal), setCreateStatus(4);
                }}
                className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center gap-x-2 text-base px-4 py-2 rounded cursor-pointer`}
              >
                <FaTowerBroadcast className="text-sm" />
                Old Broadcast Message
              </li>

              <li
                onClick={() => {
                  setOpenModal(!OpenModal), setCreateStatus(2);
                }}
              >
                <label
                  htmlFor="darkmode"
                  className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center justify-between text-base px-4 py-2 rounded cursor-pointer`}
                >
                  <span className="flex items-center gap-x-2">
                    <FaRegMessage className="text-sm" />
                    Add Shortcut Message
                  </span>
                </label>
              </li>
              <li onClick={() => GetBroadCastList()}>
                <span className="flex items-center text-base px-4 py-2 gap-x-2">
                  <FaRegMessage className="text-sm" />
                  Shortcut Message
                </span>{' '}
              </li>
              <li
                ref={menuRef}
                onClick={handleLogOutBtn}
                className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'} flex items-center gap-x-2 text-base px-4 py-2 rounded cursor-pointer`}
              >
                <BiLogOut className="text-sm" />
                Log out
              </li>
            </ul>
          </div>
        )}
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-semibold text-lg">Log out?</h3>
          <p className="py-4">Are you sure you want to log out?121212</p>

          <div className="modal-action w-full flex justify-around">
            <button onClick={handleLogOutConfirmBtn}>Yes</button>
            <form method="dialog">
              <button className="text-blue-600">No</button>
            </form>
          </div>
        </div>
      </dialog>
      <DialogBox
        // Modal_width={'65rem'}
        Modal_width={'40rem'}
        modal_id={`my_modal_3"_${CreateStatus}`}
        title={
          CreateStatus === 7
            ? 'All Users'
            : CreateStatus === 6
              ? 'Add New Boadcast'
              : CreateStatus === 2
                ? 'Add New Shortcut'
                : CreateStatus === 1
                  ? 'All Shortcut Messages'
                  : 'Old Broadcast Messages'
        }
        OpenModal={OpenModal}
        setOpenModal={setOpenModal}
        body={
          <>
            {CreateStatus === 7 ? (
              <>
                <div className="w-full pt-4   bg-slate-100 sh-[6vh] h-fit md:h-[7vh] lg:h-[6vh] flex justify-center shadow-border-radius  border-grey-200 ">
                  <label
                    className={`w-[95%] border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-200 border-gray-300'}  rounded-full px-1 flex items-center font-semibold `}
                  >
                    <input
                      type="text"
                      className="grow outline-none bg-transparent py-2 pl-4"
                      placeholder="Search people"
                      value={search}
                      onChange={handleSearchInput}
                    />
                    {search.length ? (
                      <button
                        className={` p-2 ${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700 ' : 'text-slate-700 hover:text-white hover:bg-slate-400 '} rounded-full `}
                        onClick={handleCancelSearchBtn}
                      >
                        <IoCloseSharp />
                      </button>
                    ) : (
                      <CiSearch
                        className={`text-4xl p-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} `}
                      />
                    )}
                  </label>
                </div>

                {/* <Search /> */}
                <div
                  className={` overflow-y-auto hide_scrollbar px-3 max-h-[73vh] md:max-h-[78vh] lg:max-h-[72vh] ${false ? '' : darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}
                >
                  {userList?.map((item, index) => (
                    <>
                      <div class="flex  border py-3 bg-slate-200 rounded-md my-2">
                        <div class="avatar false px-2">
                          <div class="w-12 rounded-full">
                            <img
                              alt="profile"
                              src="./images/default_profile.png"
                            />
                          </div>
                        </div>
                        <div class="flex justify-between  items-center    rounded-lg">
                          <div class="text-sm w-full ellipsis ">
                            <h1></h1>
                            <div class="flex flex-col">
                              <span class="text-lg px-2 last-message-font">
                                {item?.userName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <SingleUser data={item} key={index} /> */}
                    </>
                  ))}
                </div>
              </>
            ) : CreateStatus === 1 || CreateStatus === 4 ? (
              <table class="table-fixed border-2  mt-7">
                <thead>
                  <tr>
                    <th>SR.</th>
                    {CreateStatus === 1 ? <th>Key</th> : ' '}
                    <th>Message</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getMsgList &&
                    getMsgList.map((items, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          {CreateStatus === 1 ? <td>{items.messKey}</td> : ' '}

                          <td>{items.message}</td>
                          <td>
                            {items.dateTime.split(' ')[1]}
                            {items.dateTime.split(' ')[2]}
                          </td>
                          <td>{items.dateTime.split(' ')[0]}</td>
                          <td className="flex border-0 ">
                            {CreateStatus === 1 ? (
                              <span
                                onClick={() => {
                                  setSetRowData(items),
                                    setOpenModal(true),
                                    setCreateStatus(3);
                                }}
                              >
                                <FaRegEdit className="text-xl" />
                              </span>
                            ) : (
                              ''
                            )}

                            <span
                              onClick={() => {
                                RemoveShortcut(items._id);
                              }}
                            >
                              <FaTrashArrowUp className="text-xl" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <ReusableForm
                fieldtype={fields.filter((field) => !field.showWhen)}
                formik={formik}
                btn_name={'Login'}
                button_Size={'w-100'}
                show_submit={true}
              />
            )}
          </>
        }
      />
      <MdOutlineMessage
        className="text-2xl ms-3"
        onClick={() => {
          setOpenModal(!OpenModal), setCreateStatus(7);
        }}
      />
      <FaCircleNotch
        className="text-2xl mx-4 me-2  "
        onClick={() => {
          setOpenModal(!OpenModal), setCreateStatus(6);
        }}
      />
    </>
  );
};

export default MenuComponent;

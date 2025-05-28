// import React, { useEffect, useState } from 'react';
// import { CiSearch } from 'react-icons/ci';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoCloseSharp } from 'react-icons/io5';
// import { setOtherUsers } from '../../../Redux/features/user/userSlice';
// import { SEARCH_USERS_URI_API } from '../../../services/users.service';
// const Search = () => {
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState('');
//   const [data, setData] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const darkMode = useSelector((state) => state.darkTheme.value);
//   const otherUsers = useSelector((state) => state.user.otherUsers);

//   console.log('filteredUsers', otherUsers);

//   const handleSearchInput = (e) => {

//     setSearch(e.target.value);
//     // let newData = [];
//     // console.log('otherUsers', data);

//     // newData = data.filter((item) => {

//     // return  console.log("item" ,item);

//     //   // return (
//     //   //   !(
//     //   //     item.userName.toLowerCase().includes(e.target.value.toLowerCase()) ===
//     //   //     -1
//     //   //   ) ||
//     //   //   !(
//     //   //     item.userName.toLowerCase().includes(e.target.value.toLowerCase()) ===
//     //   //     -1
//     //   //   )
//     //   // );
//     // });

//     // console.log('newData', newData);

//     // dispatch(setOtherUsers(newData));
//     // if (!e.target.value.length) {
//     //   dispatch(setOtherUsers(data));
//     // }
//     // console.log(e.target.value);
//   };
//   const handleCancelSearchBtn = () => {
//     setSearch('');
//     dispatch(setOtherUsers(otherUsers)); // Filtered users Redux store mein update ho jayein
//     // dispatch(setOtherUsers(data));
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   if (!search) return;
//   //   // console.log(allUsers);
//   // };

//   // console.log('search', search);

//   const throttle = (func, limit) => {
//     let lastFunc;
//     let lastRan;

//     return function (...args) {
//       if (!lastRan) {
//         func.apply(this, args);
//         lastRan = Date.now();
//       } else {
//         clearTimeout(lastFunc);
//         lastFunc = setTimeout(
//           () => {
//             if (Date.now() - lastRan >= limit) {
//               func.apply(this, args);
//               lastRan = Date.now();
//             }
//           },
//           limit - (Date.now() - lastRan)
//         );
//       }
//     };
//   };

//   const getAllUser = async () => {
//     const throttledFetch = throttle(async () => {
//       try {
//         const res = await SEARCH_USERS_URI_API({ text: search });

//         console.log('resresres', res.mappingTable);

//         if (res?.status === 'error') {
//           dispatch(setOtherUsers([]));
//         } else {
//           dispatch(setOtherUsers(res?.data?.users || res.mappingTable));
//         }
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     }, 300);

//     // Call the throttled fetch
//     throttledFetch();
//   };

//   useEffect(() => {
//     if (search != '') {
//       getAllUser();
//     }
//   }, [search]);

//   useEffect(() => {
//     // if (search.length === 0) {
//     //   setFilteredUsers(otherUsers); // Reset to original list
//     // } else {
//     //   const newFilteredUsers = otherUsers.filter((user) =>
//     //     user.userName.toLowerCase().includes(search.toLowerCase())
//     //   );
//     //   setFilteredUsers(newFilteredUsers);
//     // }
//   }, [search]);

//   // useEffect(() => {
//   //   // if (search.length === 0) {
//   //   //   dispatch(setOtherUsers(otherUsers)); // Redux state bhi reset ho jaye
//   //   //   console.log('searchasdasd', search);
//   //   //   setFilteredUsers(otherUsers); // Reset to original list
//   //   // } else {
//   //   const newFilteredUsers = otherUsers.filter((user) =>
//   //     user.userName.toLowerCase().includes(search.toLowerCase())
//   //   );

//   //   console.log("newFilteredUsers" ,newFilteredUsers);

//   //   if (newFilteredUsers.length === 0) {
//   //     // setFilteredUsers(newFilteredUsers);
//   //     dispatch(setOtherUsers(otherUsers)); // Filtered users Redux store mein update ho jayein
//   //   } else {
//   //     dispatch(setOtherUsers(newFilteredUsers)); // Filtered users Redux store mein update ho jayein
//   //     // }
//   //   }
//   // }, [search, dispatch]);

//   return (
//     <>
//       <div className="w-full sh-[6vh] h-fit md:h-[4vh] lg:h-[6vh] flex justify-center">
//         {/* <h1 className="py-2 font-bold text-blue-600">Chatit</h1> */}
//         {/* <form action="" className="mb-2" onSubmit={handleSubmit}> */}

//         {/* ============================ Bottom Line Search Bar ============================= */}
//         {/* <label
//           className={`w-[95%] border-b-2 bg-transparent ${darkMode ? ' border-gray-600' : ' border-gray-300'}   px-1 flex  items-center font-semibold  `}
//         > */}
//         {/* ========================= Rounded Search Bar ======================= */}
//         {/* <label
//           className={`w-[95%] border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-300'}  rounded-full px-1 flex items-center font-semibold  `}
//         > */}
//         {/* ========================= Rounded Search Bar ======================= */}
//         <label
//           className={`w-[95%] border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-200 border-gray-300'}  rounded-full px-1 flex items-center font-semibold `}
//         >
//           {/* ========================= Medium Rounded Search Bar ======================= */}
//           {/* <label
//           className={`w-[95%] border-b-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-300'} rounded rounded-fulls px-1 flex items-center font-semibold  `}
//         > */}
//           <input
//             type="text"
//             className="grow outline-none bg-transparent py-2 pl-4"
//             // className="grow outline-none bg-transparent py-2 px-2"
//             placeholder="Search people"
//             value={search}
//             onChange={handleSearchInput}
//           />
//           {search.length ? (
//             <button
//               className={` p-2 ${darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700 ' : 'text-slate-700 hover:text-white hover:bg-slate-400 '} rounded-full `}
//               onClick={handleCancelSearchBtn}
//             >
//               <IoCloseSharp />
//             </button>
//           ) : (
//             <CiSearch
//               className={`text-4xl p-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} `}
//             />
//           )}
//         </label>
//         {/* <button className="">
//                 <CiSearch className="text-4xl hover:bg-blue-400 p-2 hover:rounded-full hover:text-white" />
//               </button> */}

//         {/* </form> */}
//       </div>
//     </>
//   );
// };

// export default Search;

import React, { useEffect, useState, useCallback } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { IoCloseSharp } from 'react-icons/io5';
import { setOtherUsers } from '../../../Redux/features/user/userSlice';
import {
  GET_ALL_USERS_URI_API,
  SEARCH_USERS_URI_API,
} from '../../../services/users.service';
import socket from '../../../utils/Socket';
const Search = ({ title }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const darkMode = useSelector((state) => state.darkTheme.value);
  const otherUsers = useSelector((state) => state.user.otherUsers);

  // console.log('otherUsers', otherUsers);

  // const getAllUser12 = async () => {
  //   // const res = await GET_ALL_USERS_URI_API();
  //   // setData(res?.data.users);
  // };

  // useEffect(() => {
  //   getAllUser12();
  // }, []);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };
  const handleCancelSearchBtn = () => {
    setSearch('');
    // dispatch(setOtherUsers(data));
  };

  // const throttle = (func, limit) => {
  //   let lastFunc;
  //   let lastRan;

  //   return function (...args) {
  //     if (!lastRan) {
  //       func.apply(this, args);
  //       lastRan = Date.now();
  //     } else {
  //       clearTimeout(lastFunc);
  //       lastFunc = setTimeout(
  //         () => {
  //           if (Date.now() - lastRan >= limit) {
  //             func.apply(this, args);
  //             lastRan = Date.now();
  //           }
  //         },
  //         limit - (Date.now() - lastRan)
  //       );
  //     }
  //   };
  // };

  // const getAllUser = async () => {
  //   console.log('socket', search);

  //   socket.emit('get_user_list', { page: '', limit: '', search: search });

  //   const handleUserList = (data) => {
  //     const newData = data.users || [];

  //     console.log('newData', newData);

  //     if (newData.length > 0) {
  //       dispatch(setOtherUsers(newData));
  //     } else {
  //       dispatch(setOtherUsers(otherUsers));
  //     }

  //     socket.off('user_list', handleUserList);
  //   };

  //   socket.on('user_list', handleUserList);
  // };

  // useEffect(() => {
  //   // if (search != '') {
  //   getAllUser();
  //   // }
  // }, [search]);

  const fetchData = async (pageNum) => {
    setLoading(true);

    socket.emit('get_user_list', {
      page: pageNum,
      limit: 10,
      search: search,
    });

    socket.on('user_list', (payload) => {
      dispatch(setOtherUsers([...payload.users]));
    });
    setLoading(false);
  };

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, clientHeight, scrollHeight } = e.target;
      // when scrolled within 20px of the bottom:
      if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
        setPage((p) => p + 1);
      }
    },
    [loading]
  );

  // fetch on page change
  useEffect(() => {
    fetchData(page);
  }, [page, search]);

  return (
    <>
      <div className="w-full pt-4   bg-slate-100 sh-[6vh] h-fit md:h-[7vh] lg:h-[6vh] flex justify-center shadow-border-radius  border-grey-200 "  onScroll={handleScroll}>
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
    </>
  );
};

export default Search;

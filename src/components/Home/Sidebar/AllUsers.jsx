// import { useDispatch, useSelector } from 'react-redux';
// import AllUserLoader from '../../Loader/AllUserLoader';
// import SingleUser from './SingleUser';
// import { GET_ALL_USERS_URI_API } from '../../../services/users.service';
// import {
//   newUpdatedUsers,
//   setOtherUsers,
// } from '../../../Redux/features/user/userSlice';
// import socketIOClient from 'socket.io-client';
// import { base_url } from '../../../utils/api_config';
// import socket from '../../../utils/Socket';

// const AllUsers = () => {
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const observerRef = useRef(null);
//   const isFetchingRef = useRef(false);
//   const dispatch = useDispatch();

//   const darkMode = useSelector((state) => state.darkTheme.value);
//   const otherUsers = useSelector((state) => state.user.otherUsers);

//   let abc = 1;
//   // useEffect(() => {
//   //   socket.on('update_user_list_entry', (updatedUser) => {
//   //     const updatedList = otherUsers.map((user) =>
//   //       user._id === updatedUser._id ? updatedUser : user
//   //     );
//   //     dispatch(setOtherUsers(updatedList));
//   //   });

//   //   return () => {
//   //     socket.off('update_user_list_entry');
//   //   };
//   // }, [otherUsers]);

//   // const fetchData = useCallback(() => {
//   //   if (!hasMore || loading || isFetchingRef.current) return;

//   //   isFetchingRef.current = true;
//   //   setLoading(true);

//   //   console.log("page" ,page);

//   //   socket.emit('get_user_list', { page: page, limit: 10, search: '' });

//   //   const handleUserList = (data) => {
//   //     const newData = data.users || [];

//   //     console.log('newData', data.users);

//   //     if (newData.length === 0) {
//   //       setHasMore(false);
//   //     } else {
//   //       dispatch(setOtherUsers([...otherUsers, ...newData]));
//   //       setPage(data.page + 1);
//   //     }

//   //     setLoading(false);
//   //     isFetchingRef.current = false;

//   //     // cleanup handler
//   //     socket.off('user_list', handleUserList);
//   //   };

//   //   socket.on('user_list', handleUserList);
//   // }, [page, hasMore, loading, otherUsers, dispatch]);

//   // useEffect(() => {
//   //   if (!hasMore) return;

//   //   const observer = new IntersectionObserver(
//   //     (entries) => {
//   //       if (entries[0].isIntersecting && !loading) {
//   //         fetchData();
//   //       }
//   //     },
//   //     { threshold: 0.1 }
//   //   );

//   //   const currentRef = observerRef.current;
//   //   if (currentRef) observer.observe(currentRef);

//   //   return () => {
//   //     if (currentRef) observer.unobserve(currentRef);
//   //   };
//   // }, [fetchData, hasMore, loading]);

//   const otherUsersRef = useRef([]);
//   const pageRef = useRef(page);

//   useEffect(() => {
//     otherUsersRef.current = otherUsers;
//     pageRef.current = page;
//   }, [otherUsers, page]);

//   const fetchData = useCallback(() => {
//     if (!hasMore || loading || isFetchingRef.current) return;

//     isFetchingRef.current = true;
//     setLoading(true);

//     console.log('Fetching page:', pageRef.current);

//     const handleUserList = (data) => {
//       socket.off('user_list', handleUserList); // prevent duplicate listeners

//       const newData = data.users || [];

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         dispatch(setOtherUsers([...otherUsersRef.current, ...newData]));
//         setPage((prevPage) => prevPage + 1);
//         pageRef.current = pageRef.current + 1;
//       }

//       setLoading(false);
//       isFetchingRef.current = false;
//     };

//     socket.once('user_list', handleUserList);
//     socket.emit('get_user_list', {
//       page: pageRef.current,
//       limit: 50,
//       search: '',
//     });
//   }, [hasMore, loading, dispatch, socket]);

//   useEffect(() => {
//     if (!hasMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           fetchData();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const currentRef = observerRef.current;
//     if (currentRef) observer.observe(currentRef);

//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [hasMore, loading]);

//   console.log('otherUsers', otherUsers);

//   return (
//     <>
//       <div
//         className={`overflow-y-auto bg-slate-100 hide_scrollbar px-3 max-h-[83vh] md:max-h-[86vh] lg:max-h-[85vh] ${
//           darkMode ? 'bg-slate-950' : 'bg-slate-100'
//         }`}
//       >
//         {otherUsers?.map((item, index) => (
//           <SingleUser data={item} key={item._id || index} abc={abc} />
//         ))}

//         <div
//           ref={observerRef}
//           style={{ height: '10px', background: 'transparent' }}
//         ></div>

//         {loading && (
//           <>
//             <AllUserLoader />
//             <AllUserLoader />
//             <AllUserLoader />
//           </>
//         )}
//       </div>

//       {otherUsers?.length === 0 && !loading && (
//         <div className="w-full h-36 flex justify-center items-center">
//           <p>No user found</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default AllUsers;

// import { useDispatch, useSelector } from 'react-redux';
// import AllUserLoader from '../../Loader/AllUserLoader';
// import SingleUser from './SingleUser';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import { setOtherUsers } from '../../../Redux/features/user/userSlice';
// import socket from '../../../utils/Socket';

// const AllUsers = () => {
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const observerRef = useRef(null);
//   const isFetchingRef = useRef(false);
//   const dispatch = useDispatch();

//   const darkMode = useSelector((state) => state.darkTheme.value);
//   const otherUsers = useSelector((state) => state.user.otherUsers);

//   const otherUsersRef = useRef([]);
//   const pageRef = useRef(page);

//   const fetchData = useCallback(() => {
//     if (!hasMore || loading || isFetchingRef.current) return;

//     isFetchingRef.current = true;
//     setLoading(true);

//     const handleUserList = (data) => {
//       const newData = data.users || [];

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         dispatch(setOtherUsers([...otherUsersRef.current, ...newData]));
//         setPage((prevPage) => prevPage + 1);
//         pageRef.current += 1;
//       }

//       setLoading(false);
//       isFetchingRef.current = false;
//     };

//     // Use `once` to prevent multiple triggers
//     socket.once('user_list', handleUserList);

//     socket.emit('get_user_list', {
//       page: pageRef.current,
//       limit: 10,
//       search: '',
//     });
//   }, [hasMore, loading, dispatch]);

//   useEffect(() => {
//     // if (page === 1 && otherUsers.length === 0 && !isFetchingRef.current) {
//       fetchData();
//     // }
//   }, [fetchData]);

//   useEffect(() => {
//     if (!hasMore) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading) {
//           fetchData();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     const currentRef = observerRef.current;
//     if (currentRef) observer.observe(currentRef);

//     return () => {
//       if (currentRef) observer.unobserve(currentRef);
//     };
//   }, [hasMore, loading]);

//   return (
//     <>
//       <div
//         className={`overflow-y-auto bg-slate-100 hide_scrollbar px-3 max-h-[83vh] md:max-h-[86vh] lg:max-h-[85vh] ${
//           darkMode ? 'bg-slate-950' : 'bg-slate-100'
//         }`}
//       >
//         {otherUsers?.map((item, index) => (
//           <SingleUser data={item} key={item._id || index} abc={1} />
//         ))}

//         <div
//           ref={observerRef}
//           style={{ height: '10px', background: 'transparent' }}
//         ></div>

//         {loading && (
//           <>
//             <AllUserLoader />
//             <AllUserLoader />
//             <AllUserLoader />
//           </>
//         )}
//       </div>

//       {otherUsers?.length === 0 && !loading && (
//         <div className="w-full h-36 flex justify-center items-center">
//           <p>No user found</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default AllUsers;

// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useCallback } from 'react';

// import { setOtherUsers } from '../../../Redux/features/user/userSlice';
// import socket from '../../../utils/Socket';
// import SingleUser from './SingleUser';

// const InfiniteScroll = () => {
//   const dispatch = useDispatch();

//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true); // agar aur data mil sakta hai
//   const [loading, setLoading] = useState(false);
//   const loader = useRef(null);
//   const boxRef = useRef(page);

//   const otherUsers = useSelector((state) => state.user.otherUsers);

//   console.log('otherUsers', otherUsers);

//   //   const fetchData = useCallback(() => {
//   //     if (!hasMore || loading || isFetchingRef.current) return;

//   //     isFetchingRef.current = true;
//   //     setLoading(true);

//   //     const handleUserList = (data) => {
//   //       const newData = data.users || [];

//   //       if (newData.length === 0) {
//   //         setHasMore(false);
//   //       } else {
//   //         dispatch(setOtherUsers([...otherUsersRef.current, ...newData]));
//   //         setPage((prevPage) => prevPage + 1);
//   //         pageRef.current += 1;
//   //       }

//   //       setLoading(false);
//   //       isFetchingRef.current = false;
//   //     };

//   //     // Use `once` to prevent multiple triggers
//   //     socket.once('user_list', handleUserList);

//   //     socket.emit('get_user_list', {
//   //       page: pageRef.current,
//   //       limit: 10,
//   //       search: '',
//   //     });
//   //   }, [hasMore, loading, dispatch]);

//   // Dummy data fetcher (replace this with real API)

//   const handleUserList = useCallback(
//     (data) => {
//       // Use the most recent value of 'page' even if it's updated during the async process
//       console.log('Requesting page:', page);

//       if (data.page !== page) return; // Only process if the page matches

//       const newData = data.users || [];
//       console.log('newData', newData);

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         // Use functional update to ensure you get the latest state
//         dispatch(setOtherUsers([...otherUsers, ...newData]));
//       }

//       setLoading(false);
//     },
//     [dispatch, page] // This ensures the callback always has the latest 'page' state
//   );

//   const fetchData = (currentPage) => {
//     setLoading(true);

//     // Emit the event to get the new user list
//     socket.emit('get_user_list', {
//       page: currentPage,
//       limit: 10,
//       search: '',
//     });
//     socket.on('user_list', handleUserList);

//     socket.off('user_list', handleUserList);
//   };

//   useEffect(() => {
//     fetchData(page); // Trigger fetchData only when page changes
//   }, [page]); // This effect depends on 'page', so it will trigger on page changes

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const target = entries[0];
//         if (target.isIntersecting && hasMore && !loading) {
//           setPage((prev) => prev + 1); // Increment page number when loading more
//         }
//       },
//       { threshold: 1.0 } // Ensure it triggers when fully in view
//     );

//     if (loader.current) observer.observe(loader.current);

//     return () => {
//       if (loader.current) observer.unobserve(loader.current); // Cleanup observer
//     };
//   }, [hasMore, loading]);

//   return (
//     <div
//       className={`overflow-y-auto bg-slate-100 hide_scrollbar px-3 max-h-[83vh] md:max-h-[86vh] lg:max-h-[85vh] `}
//     >
//       <div
//         ref={boxRef}
//         onScroll={handleScroll}
//         className="h-[60vh] overflow-auto border"
//       >
//         {data.map((item, idx) => (
//           <div key={idx} className="p-2 border-b">
//             {item}
//           </div>
//         ))}
//         {loading && <div className="p-4 text-center">Loading more…</div>}
//       </div>
//       {/*
//       <div style={{ maxWidth: '600px', margin: '0 auto' }}>
//         {otherUsers?.map((item, index) => (
//           <SingleUser data={item} key={item._id || index} />
//         ))}

//         {loading && <p>Loading...</p>}
//         {!hasMore && <p>No more data to load</p>}
//         <div ref={loader} style={{ height: '20px' }}></div>
//       </div> */}
//     </div>
//   );
// };

// export default InfiniteScroll;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import socket from '../../../utils/Socket';
import { useDispatch, useSelector } from 'react-redux';
import SingleUser from './SingleUser';
import { setOtherUsers } from '../../../Redux/features/user/userSlice';
const InfiniteScrollBox = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const otherUsers = useSelector((state) => state.user.otherUsers);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const boxRef = useRef(null);

  useEffect(() => {
    socket.on('update_user_list_entry', (updatedUser) => {
      console.log('updatedUser', updatedUser);

      const updatedList = otherUsers
        .map((user) => (user?._id === updatedUser?._id ? updatedUser : user))
        .sort((a, b) => new Date(b.updatedTime) - new Date(a.updatedTime));
      dispatch(setOtherUsers(updatedList));
    });

    return () => {
      socket.off('update_user_list_entry');
    };
  }, [otherUsers]);

  const fetchData = async (pageNum) => {
    setLoading(true);

    socket.emit('get_user_list', {
      page: pageNum,
      limit: 10,
      search: '',
    });

    socket.on('user_list', (payload) => {
      dispatch(setOtherUsers([...otherUsers, ...payload.users]));
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
  }, [page]);

  return (
    // <div
    //   className={` bg-slate-100 hide_scrollbar px-3 max-h-[83vh] md:max-h-[86vh] lg:max-h-[85vh] `}
    // >
    <div
      ref={boxRef}
      onScroll={handleScroll}
      className="h-[86vh] overflow-y-scroll border"
    >
      {otherUsers?.map((item, index) => (
        <SingleUser data={item} key={item._id || index} />
      ))}
      {loading && <div className="p-4 text-center">Loading more…</div>}
    </div>
    // </div>
  );
};

export default InfiniteScrollBox;

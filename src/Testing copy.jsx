// import { useState, useRef } from "react";
// import { FaMicrophone, FaStop } from "react-icons/fa";

// export default function AudioRecorder() {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunks = useRef([]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         audioChunks.current.push(event.data);
//       };

//       mediaRecorderRef.current.onstop = () => {
//         const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
//         const url = URL.createObjectURL(audioBlob);
//         setAudioURL(url);
//         audioChunks.current = [];
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error("Microphone access error:", error);
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setIsRecording(false);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
//       <div className="w-[500px] p-4 bg-gray-200 rounded-lg shadow-lg flex flex-col">
//         <div className="flex justify-between items-center bg-gray-400 p-3 rounded-lg">
//           <div className="flex flex-col">
//             <span className="text-green-900 font-semibold text-sm">Audio Recorder</span>
//             <span className="text-black text-base">
//               {isRecording ? "Recording..." : "Click to record audio"}
//             </span>
//           </div>
//           <button
//             className="text-gray-600 hover:text-black"
//             onClick={() => setAudioURL(null)}
//           >
//             ✖
//           </button>
//         </div>
//         <div className="flex justify-center items-center p-4">
//           {!isRecording ? (
//             <button
//               onClick={startRecording}
//               className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
//             >
//               <FaMicrophone size={24} />
//             </button>
//           ) : (
//             <button
//               onClick={stopRecording}
//               className="bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600"
//             >
//               <FaStop size={24} />
//             </button>
//           )}
//         </div>
//         {audioURL && (
//           <audio controls className="w-full mt-2">
//             <source src={audioURL} type="audio/wav" />
//             Your browser does not support the audio element.
//           </audio>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { motion } from "framer-motion";
// // import { Button } from "@/components/ui/button";
// import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

// const diceFaces = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

// export default function LudoGame() {
//   const [diceValue, setDiceValue] = useState(1);
//   const [rolling, setRolling] = useState(false);

//   const rollDice = () => {
//     setRolling(true);
//     setTimeout(() => {
//       const newValue = Math.floor(Math.random() * 6) + 1;
//       setDiceValue(newValue);
//       setRolling(false);
//     }, 1000);
//   };

//   const DiceIcon = diceFaces[diceValue - 1];

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-green-200">
//       <h1 className="text-4xl font-bold mb-4">Ludo Game 🎲</h1>
//       <motion.div animate={{ rotate: rolling ? 360 : 0 }} transition={{ duration: 1 }}>
//         <DiceIcon className="w-20 h-20 text-black" />
//       </motion.div>
//       <button onClick={rollDice} disabled={rolling} className="mt-4 px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white">
//         {rolling ? "Rolling..." : "Roll Dice"}
//       </button>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const InfiniteScroll = () => {
//   const [data, setData] = useState([]); // API data store karega
//   const [page, setPage] = useState(1); // Current page track karega
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const observerRef = useRef(null);

//   // 📌 API se data fetch karna
//   const fetchData = async () => {
//     if (!hasMore || loading) return;
//     setLoading(true);

//     // `https://api.example.com/posts?page=${page}`
//     try {
//       const response = await axios.get(
//         `http://3.250.174.141:7806/user/all?page=${page}&limit=20`
//       );

//       const newData = response.data.data.users;

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         setData((prev) => [...prev, ...newData]);
//         setPage((prev) => prev + 1);
//       }
//     } catch (error) {
//       console.error('Error fetching data', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (loading) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           fetchData();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerRef.current) observer.observe(observerRef.current);

//     return () => {
//       if (observerRef.current) observer.unobserve(observerRef.current);
//     };
//   }, [loading, hasMore]);

//   console.log('observerRef', observerRef);

//   return (
//     <div className="container">
//       <h2>Infinite Scroll with Pagination</h2>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>{item.userName}</li> // API ka data show karega
//         ))}
//       </ul>

//       {/* {loading && <p>Loading...</p>} */}
//       {!hasMore && <p>No more data</p>}

//       {/* 👇 Intersection Observer ke liye reference */}
//       <div
//         ref={observerRef}
//         style={{ height: '20px', background: 'transparent' }}
//       ></div>
//     </div>
//   );
// };

// export default InfiniteScroll;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import io from 'socket.io-client';

// const socket = io('http://3.250.174.141:7806/'); // Replace with your server URL

// const Chat = ({ userId, userName, roomId, receiverId }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   const { _id, email, mobile, name, role } = JSON.parse(
//     localStorage.getItem('info')
//   );
//   const details = useSelector((state) => state.user.details);

//   const selectedUser = useSelector((state) => state.user.selectedUser);

//   // Join room on mount
//   let room_ID = '61fbd0cd41b0d43022cabf27-67974c7eb81801947f2d26ef';
//   useEffect(() => {
//     // socket.emit('join_room', room_ID);

//     socket.on('receive_message', (data) => {
//       console.log('Message received: ', data);
//       setMessages((prev) => [...prev, data]);
//     });

//     socket.on('new_message_notification', (notif) => {
//       console.log('🔔 Notification:', notif);
//     });

//     return () => {
//       socket.off('receive_message');
//       socket.off('new_message_notification');
//     };
//   }, [room_ID]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const messageData = {
//       sender: userId,
//       receiver: receiverId,
//       message: message,
//       room: '61fbd0cd41b0d43022cabf27-67974c7eb81801947f2d26ef',
//       dateTime: new Date().toLocaleString(),
//       dateTimestamp: Date.now(),
//     };

//     socket.emit('send_message', messageData);
//     setMessage('');
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Chat Room: {room_ID}</h2>
//       <div className="h-64 overflow-y-auto border p-2 mb-4 bg-white rounded shadow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-2 p-2 rounded ${msg.sender._id === userId ? 'bg-green-100 text-right' : 'bg-gray-100 text-left'}`}
//           >
//             <div className="text-sm font-semibold">{msg.sender.userName}</div>
//             <div>{msg.message}</div>
//             <div className="text-xs text-gray-500">{msg.dateTime}</div>
//           </div>
//         ))}
//       </div>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="border rounded w-full p-2"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;





















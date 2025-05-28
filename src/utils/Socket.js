// socket.js
import { base_url } from './api_config';
import { io } from "socket.io-client";

const socket = io(base_url, { transports: ['websocket'] });

export default socket;

import io from 'socket.io-client';

const socket = io(process.env.SOCKET_SERVER_URL);

export default socket;

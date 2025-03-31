import { Server, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT: number = parseInt(process.env.PORT || '8080');
const server = http.createServer();

const io = new Server(server);

io.on('connection', (socket: Socket) => {
  console.log('A user connected');
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

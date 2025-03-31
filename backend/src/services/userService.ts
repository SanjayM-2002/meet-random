import { Socket } from 'socket.io';
import { RoomService } from './roomService';

interface User {
  socket: Socket;
  userName: string;
  email?: string;
  gender?: string;
  interest?: string;
}

class UserService {
  private users: User[];
  private queue: string[];
  private roomManager: RoomService;
  constructor() {
    this.users = [];
    this.queue = [];
    this.roomManager = new RoomService();
  }
  addUser(name: string, socket: Socket, email: string) {
    this.users.push({ userName: name, socket, email });
    this.queue.push(socket.id);
    this.clearQueue();
    this.initHandlers(socket);
  }
  removeUser(socketId: string) {
    this.users = this.users.filter((user) => user.socket.id !== socketId);
    this.queue = this.queue.filter((id) => id === socketId);
  }
  private clearQueue() {
    if (this.queue.length < 2) return;
    const user1 = this.users.find(
      (user) => user.socket.id === this.queue.pop()
    );
    const user2 = this.users.find(
      (user) => user.socket.id === this.queue.pop()
    );
    if (!user1 || !user2) return;
    const room = this.roomManager.createRoom(user1, user2);
  }
  private initHandlers(socket: Socket) {
    socket.on('offer', ({ sdp, roomId }: { sdp: string; roomId: number }) => {
      this.roomManager.onOffer(roomId, sdp);
    });
    socket.on('answer', ({ sdp, roomId }: { sdp: string; roomId: number }) => {
      this.roomManager.onAnswer(roomId, sdp);
    });
  }
}

export { UserService, User };

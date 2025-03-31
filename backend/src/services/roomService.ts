import { User } from './userService';

let GLOBAL_ROOM_COUNT = 1;

interface Room {
  user1: User;
  user2: User;
}

class RoomService {
  private rooms: Map<number, Room>;
  constructor() {
    this.rooms = new Map<number, Room>();
  }

  private generateRoomId() {
    return GLOBAL_ROOM_COUNT++;
  }
  createRoom(user1: User, user2: User) {
    const roomId = this.generateRoomId();
    this.rooms.set(roomId, { user1, user2 });
    user1?.socket.emit('offer', {
      roomId,
    });
  }
  onOffer(roomId: number, sdp: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const user2 = room.user2;
    user2?.socket.emit('offer', {
      sdp,
    });
  }
  onAnswer(roomId: number, sdp: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const user1 = room.user1;
    user1?.socket.emit('offer', {
      sdp,
    });
  }
}

export { RoomService };

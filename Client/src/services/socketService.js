import config from '../utils/config';
import { io } from 'socket.io-client';


class SocketService {
    socket = null;

    connect = () => {
        if(!this.socket)
            this.socket = io(config.rootUrl);
        return this.socket
    }

    emit = (event, payload) => {
        if(this.socket)
            this.socket.emit(event, payload)
    }

    on = (event, callback) => {
        if(this.socket)
            this.socket.on(event,callback)
    }

    disconnect = () => {
        if(this.socket){
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

const socketService = new SocketService();

export default socketService;
import { Server } from "socket.io";

const codeBlockRooms = {};

const setupSocket = (server) => {
    const io = new Server (server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        handleJoinCodeBlock(io,socket);
        handleCodeChange(socket);
        handleDisconnecting(io, socket);
    });
}

const handleJoinCodeBlock = (io, socket) => {
    socket.on("joinCodeBlock", ({ codeBlockId, initialCode = "" }) => {
        socket.join(codeBlockId);

        const room = codeBlockRooms[codeBlockId];

        if(!room) {
            codeBlockRooms[codeBlockId] = {
                mentor: socket.id,
                students: [],
                code: initialCode
            };
            socket.emit("setRole", "mentor");
            
        } else if (room.mentor) {
            room.students.push(socket.id);
            socket.emit("setRole", "student");
            socket.emit("codeUpdate", room.code);
           
        } else {
            socket.emit("redirectToLobby");
            return;
        }

        io.to(codeBlockId).emit("studentCount", codeBlockRooms[codeBlockId].students.length);
    });
}

const handleCodeChange = (socket) => {
    socket.on("codeChange", ({codeBlockId, code}) => {
        if(!codeBlockRooms[codeBlockId]) return;

        codeBlockRooms[codeBlockId].code = code;
        socket.to(codeBlockId).emit("codeUpdate", code);
    });
}

const handleDisconnecting = (io, socket) => {
    socket.on("disconnecting", () => {
        const codeBlocks = [...socket.rooms];

        codeBlocks.forEach((codeBlockId) => {
            const room = codeBlockRooms[codeBlockId];
            if(!room) return;

            if (room.mentor === socket.id) {
                delete codeBlockRooms[codeBlockId];
                io.to(codeBlockId).emit("redirectToLobby");
                
            } else {
                room.students = room.students.filter(id => id !== socket.id);
                io.to(codeBlockId).emit("studentCount", room.students.length);
            }
        });
    });
}

export default setupSocket;
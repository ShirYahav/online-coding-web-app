import { Server } from "socket.io";
import runInSandbox from "./sandbox_running_logic.js";

const codeBlockRooms = {};

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    handleJoinCodeBlock(io, socket);
    handleCodeChange(socket);
    handleSolved(io, socket);
    handleUnsolved(io, socket);
    handleRequestHint(io, socket);
    handleRunCode(io, socket);
    handleDisconnecting(io, socket);
  });
};

const handleJoinCodeBlock = (io, socket) => {
  socket.on(
    "joinCodeBlock",
    async ({ codeBlockId, initialCode = "", hints = [], tests = [] }) => {
      socket.join(codeBlockId);

      const room = codeBlockRooms[codeBlockId];

      if (!room) {
        codeBlockRooms[codeBlockId] = {
          mentor: socket.id,
          students: [],
          code: initialCode,
          solved: false,
          revealedHints: 0,
          hints: hints,
          tests: tests,
        };
        socket.emit("setRole", "mentor");
      } else if (room.mentor) {
        room.students.push(socket.id);
        socket.emit("setRole", "student");
        socket.emit("codeUpdate", room.code);
        if (room.solved) socket.emit("blockSolved");
      } else {
        socket.emit("redirectToLobby");
        return;
      }

      io.to(codeBlockId).emit(
        "studentCount",
        codeBlockRooms[codeBlockId].students.length
      );
    }
  );
};

const handleCodeChange = (socket) => {
  socket.on("codeChange", ({ codeBlockId, code }) => {
    if (!codeBlockRooms[codeBlockId]) return;

    codeBlockRooms[codeBlockId].code = code;
    socket.to(codeBlockId).emit("codeUpdate", code);
  });
};

const handleSolved = (io, socket) => {
  socket.on("solved", ({ codeBlockId }) => {
    const room = codeBlockRooms[codeBlockId];
    if (!room || room.solved) return;
    room.solved = true;
    io.to(codeBlockId).emit("blockSolved");
  });
};

const handleUnsolved = (io, socket) => {
  socket.on("unsolved", ({ codeBlockId }) => {
    const room = codeBlockRooms[codeBlockId];
    if (!room || !room.solved) return;
    room.solved = false;
    io.to(codeBlockId).emit("blockUnsolved");
  });
};

const handleRequestHint = (io, socket) => {
  socket.on("requestHint", ({ codeBlockId }) => {
    const room = codeBlockRooms[codeBlockId];

    if (!room) return;

    if (room.hints && room.revealedHints < room.hints.length) {
      const nextHint = room.hints[room.revealedHints];
      room.revealedHints++;

      io.to(codeBlockId).emit("hintRevealed", {
        order: nextHint.order,
        text: nextHint.text,
      });
    }
  });
};

const handleRunCode = (io, socket) => {
  socket.on("runCode", ({ codeBlockId }) => {
    const room = codeBlockRooms[codeBlockId];
    if (!room) return;

    const code = room.code;
    const { consoleOutput, testResults } = runInSandbox(code, room.tests || []);

    io.to(codeBlockId).emit("runResults", {
      consoleOutput,
      testResults,
    });

    const passedAll =
      testResults.length > 0 && testResults.every((res) => res.passed);
    if (passedAll) {
      room.solved = true;
      io.to(codeBlockId).emit("blockSolved");
    } else {
      room.solved = false;
      io.to(codeBlockId).emit("blockUnsolved");
    }
  });
};

const handleDisconnecting = (io, socket) => {
  socket.on("disconnecting", () => {
    const codeBlocks = [...socket.rooms];

    codeBlocks.forEach((codeBlockId) => {
      const room = codeBlockRooms[codeBlockId];
      if (!room) return;

      if (room.mentor === socket.id) {
        delete codeBlockRooms[codeBlockId];
        io.to(codeBlockId).emit("redirectToLobby");
      } else {
        room.students = room.students.filter((id) => id !== socket.id);
        io.to(codeBlockId).emit("studentCount", room.students.length);
      }
    });
  });
};

export default setupSocket;

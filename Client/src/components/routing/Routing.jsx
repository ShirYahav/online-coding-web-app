import { Navigate, Route, Routes } from "react-router-dom";
import CodeBlockEditor from "../codeBlocksArea/CodeBlockEditor";
import Lobby from "../lobbyArea/Lobby";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/codeBlocks" />} />
        <Route path="/codeBlocks" element={<Lobby />} />
        <Route path="/codeBlocks/:codeBlockId" element={<CodeBlockEditor />} />
      </Routes>
    </>
  );
};

export default Routing;

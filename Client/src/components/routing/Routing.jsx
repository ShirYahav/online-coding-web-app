import { Navigate, Route, Routes } from "react-router-dom";
import CodeBlockEditor from "../codeBlocksArea/CodeBlockEditor";
import Lobby from "../lobbyArea/Lobby";
import NotFound from "../pages/NotFound";

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/codeBlocks" />} />
        <Route path="/codeBlocks" element={<Lobby />} />
        <Route path="/codeBlocks/:codeBlockId" element={<CodeBlockEditor />} />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Routing;

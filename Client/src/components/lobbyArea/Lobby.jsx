import CodeBlocksList from "../codeBlocksArea/CodeBlocksList";

const Lobby = () => {
  return (
    <>
      <div className="max-w-[80%] mx-auto">
        <h1 className="text-xl sm:text-4xl text-center font-bold p-12">Choose Code Block</h1>
        <CodeBlocksList />
      </div>
    </>
  );
};

export default Lobby;

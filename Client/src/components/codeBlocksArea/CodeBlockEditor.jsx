import socketService from "@/services/socketService";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../utils/config";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';


const CodeBlockEditor = () => {
  const { codeBlockId } = useParams();
  const [codeBlock, setCodeBlock] = useState();
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [showSmiley, setShowSmiley] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCodeBlockAndConnect = async () => {
      try {
        const response = await axios.get(config.getCodeBlocks + codeBlockId);
        setCodeBlock(response.data);
        setCode(response.data?.template);

        socketService.connect();

        socketService.emit("joinCodeBlock", {
          codeBlockId,
          initialCode: response.data?.template,
        });
        socketService.on("setRole", (receivedRole) => setRole(receivedRole));
        socketService.on("codeUpdate", (updatedCode) => setCode(updatedCode));
        socketService.on("studentCount", (count) => setStudentCount(count));
        socketService.on("redirectToLobby", () => {
          alert("Mentor left. Redirecting...");
          navigate("/");
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadCodeBlockAndConnect();

    return () => {
      socketService.disconnect();
    };
  }, [codeBlockId, navigate]);

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);

    if (role === "student")
      socketService.emit("codeChange", { codeBlockId, code: newCode });

    setShowSmiley(newCode.trim() === codeBlock?.solution.trim());
  };

  return (
    <>
      <Link
        to="/"
        className="absolute top-4 left-6 text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </Link>

      {role === "mentor" && (
        <p className="absolute top-4 right-6 text-sm text-muted-foreground">
          Hi Tom!
        </p>
      )}

      <h1 className="text-3xl text-center font-bold p-15">
        {codeBlock?.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-3 ml-[13%]">
        {codeBlock?.description}
      </p>
      {showSmiley && <div>:)</div>}
      <CodeMirror
        value={code}
        height="400px"
        theme={tokyoNight} 
        extensions={[javascript()]}
        onChange={(value) => handleCodeChange({ target: { value } })}
        readOnly={role === "mentor"}
        className="w-[74%] mx-auto rounded-md"
      />
      <p className="mt-2 ml-[13%]">Students in session: {studentCount}</p>
    </>
  );
};

export default CodeBlockEditor;

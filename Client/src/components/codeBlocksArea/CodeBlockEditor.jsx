import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import config from "../../utils/config";
import socketService from "@/services/socketService";

const CodeBlockEditor = () => {
  const { codeBlockId } = useParams();
  const [codeBlock, setCodeBlock] = useState();
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const [studentCount, setStudentCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCodeBlockAndConnect = async () => {
      try {
        const response = await axios.get(config.getCodeBlocks + codeBlockId);
        setCodeBlock(response.data);
        setCode(response.data.template);

        socketService.connect();

        socketService.emit("joinCodeBlock", {
          codeBlockId,
          initialCode: response.data.template,
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

    if (role === "student") {
      socketService.emit("codeChange", { codeBlockId, code: newCode });
    }
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
      <Textarea
        value={code}
        onChange={handleCodeChange}
        readOnly={role === "mentor"}
        className="w-[74%] h-[400px] bg-muted mx-auto rounded-md p-5"
      />
      <p className="mt-2 ml-[13%]">Students in session: {studentCount}</p>
    </>
  );
};

export default CodeBlockEditor;

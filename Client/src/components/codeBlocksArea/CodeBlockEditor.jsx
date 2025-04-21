import { useCodeBlockData } from "@/hooks/useCodeBlockData";
import { useCodeBlockSocket } from "@/hooks/useCodeBlockSocket";
import socketService from "@/services/socketService";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import smileyDog from "../../assets/gifs/smileyDog.gif";

const CodeBlockEditor = () => {
  const { codeBlockId } = useParams();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const codeBlock = useCodeBlockData(codeBlockId);

  useEffect(() => {
    if (codeBlock?.template) {
      setCode(codeBlock.template);
    }
  }, [codeBlock]);

  useCodeBlockSocket(codeBlockId, codeBlock?.template, {
    onRole: setRole,
    onCode: setCode,
    onCount: setStudentCount,
    onSolved: setSolved,
    onUnsolved: setSolved, 
    onRedirect: () => {
      alert("Mentor left. Redirecting…");
      navigate("/");
    },
  });

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);

    if (role === "student")
      socketService.emit("codeChange", { codeBlockId, code: newCode });

    if (newCode.trim() === codeBlock?.solution.trim()) {
      if (!solved) {
        socketService.emit("solved", { codeBlockId });
      }

      setSolved(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    } else {
      if (solved) {
        socketService.emit("unsolved", { codeBlockId });
      }
      setSolved(false);
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
      {showCelebration && role === "student" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <img src={smileyDog} alt="Success!" className="w-[180px]" />
          <p className="text-2xl mt-4 text-white">You did it!</p>
        </div>
      )}

      {solved && (
        <p className="absolute top-4 left-1/2 -translate-x-1/2 text-lg font-semibold text-green-600">
          Solved!
        </p>
      )}

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

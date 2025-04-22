import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCodeBlockData } from "@/hooks/useCodeBlockData";
import { useCodeBlockSocket } from "@/hooks/useCodeBlockSocket";
import socketService from "@/services/socketService";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import smileyDog from "../../assets/gifs/smileyDog.gif";

const CodeBlockEditor = () => {
  const { codeBlockId } = useParams();

  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [hints, setHints] = useState([]);
  const [runOutput, setRunOutput] = useState("");
  const [testResults, setTestResults] = useState([]);
  const navigate = useNavigate();

  const codeBlock = useCodeBlockData(codeBlockId);

  const totalHints = codeBlock?.hints?.length || 0;

  useEffect(() => {
    if (codeBlock?.template) setCode(codeBlock.template);
  }, [codeBlock]);

  useCodeBlockSocket({
    codeBlockId,
    initialCode: codeBlock?.template,
    initialHints: codeBlock?.hints,
    initialTests: codeBlock?.tests,
    setRole,
    setCode,
    setStudentCount,
    setSolved,
    setShowCelebration,
    setHints,
    setRunOutput,
    setTestResults,
    navigate,
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
    } else {
      if (solved) socketService.emit("unsolved", { codeBlockId });
      setSolved(false);
    }
  };

  const requestNextHint = () => {
    socketService.emit("requestHint", { codeBlockId });
  };

  const runCode = () => {
    socketService.emit("runCode", { codeBlockId });
  };

  return (
    <>
      <Link
        to="/"
        className="absolute top-4 left-6 text-sm text-muted-foreground hover:underline"
      >
        ← Back
      </Link>

      {(role === "mentor" || role === "student") && (
        <p className="absolute top-4 right-6 text-sm text-muted-foreground">
          {role === "mentor" ? "Hi Tom!" : "Hi Student!"}
        </p>
      )}

      <h1 className="text-2xl sm:text-3xl text-center font-bold pt-10 mb-4 mt-2 sm:mb-[60px]">
        {codeBlock?.title}
      </h1>

      {showCelebration && role === "student" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <img
            src={smileyDog}
            alt="Success!"
            className="w-[205px] h-[205px] rounded-full object-cover object-[50%_25%]"
          />
          <p className="text-1xl mt-4 text-white">You did it!</p>
        </div>
      )}
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-6 mt-6 items-start">
        <div className="w-full lg:basis-[70%] flex flex-col">
          <p className="text-sm text-muted-foreground mb-2">
            {codeBlock?.description}
          </p>
          {solved && (
            <p className="mb-2 mt-[-7px] text-lg font-semibold text-[#bb9af7]">
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
            className="w-[100%] mx-auto rounded-md text-base"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Students in session: {studentCount}
          </p>
        </div>

        <div className="w-full lg:basis-[25%] flex flex-col mt-6 lg:mt-[26px]">
          <Button
            onClick={requestNextHint}
            disabled={role !== "student" || hints.length >= totalHints}
            className="w-full mb-2 bg-[#1f2335] rounded-sm text-sm text-white cursor-pointer"
          >
            Get Hint
          </Button>

          {hints.map((hint) => (
            <Collapsible
              key={hint.order}
              defaultOpen
              className="border rounded-sm mb-2"
            >
              <CollapsibleTrigger className="px-4 py-2 w-full text-left text-sm font-bold cursor-pointer">
                Hint {hint.order}/{totalHints}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-2 bg-gray-50 text-sm">
                {hint.text}
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Button
            onClick={runCode}
            className="w-full mt-4 bg-[#bb9af7] text-white rounded-sm text-sm cursor-pointer hover:bg-[#1f2335]"
          >
            Run ▶
          </Button>
          {runOutput && (
            <div className="mt-4 mb-4 bg-[#1f2335] text-white p-2 rounded-sm text-sm">
              <strong>Console Output:</strong>
              <pre>{runOutput}</pre>
            </div>
          )}

          {testResults?.length > 0 && (
            <div className="space-y-2 mb-5">
              <p className="text-[#1f2335] mt-4 font-bold">Test Results:</p>
              {testResults.map((res, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-sm text-sm ${
                    res.passed ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  {res.name}: {res.passed ? "Passed" : "Failed"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CodeBlockEditor;

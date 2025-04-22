import socketService from "@/services/socketService";
import { useEffect } from "react";

export const useCodeBlockSocket = ({
  codeBlockId,
  initialCode = "",
  initialHints = [],
  initialTests = [],
  setRole,
  setCode,
  setStudentCount,
  setSolved,
  setShowCelebration,
  setHints,
  setRunOutput,
  setTestResults,
  navigate,
}) => {
  useEffect(() => {
    socketService.connect();

    socketService.emit("joinCodeBlock", {
      codeBlockId,
      initialCode,
      hints: initialHints,
      tests: initialTests,
    });

    socketService.on("setRole", setRole);
    socketService.on("codeUpdate", setCode);
    socketService.on("studentCount", setStudentCount);

    socketService.on("blockSolved", () => {
      setSolved(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3500);
    });

    socketService.on("blockUnsolved", () => {
      setSolved(false);
    });

    socketService.on("redirectToLobby", () => {
      navigate("/");
    });

    socketService.on("hintRevealed", (hint) => {
      setHints((prev) => [...prev, hint]);
    });

    socketService.on("runResults", ({ consoleOutput, testResults }) => {
      setRunOutput(consoleOutput);
      setTestResults(testResults);
    });

    return () => socketService.disconnect();
  }, [codeBlockId, initialCode]);
};

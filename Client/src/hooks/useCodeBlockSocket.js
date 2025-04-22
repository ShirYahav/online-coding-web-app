import socketService from "@/services/socketService";
import { useEffect } from "react"

export const useCodeBlockSocket = (codeBlockId, initialCode, { initialHints = [], onRole, onCode, onCount, onSolved, onUnsolved, onHint, onRedirect }) => {
    useEffect(() => {
        onHint([]);

        socketService.connect();
        socketService.emit("joinCodeBlock", {
            codeBlockId,
            initialCode,
            hints: initialHints, 
        });
        socketService.on("setRole", onRole);
        socketService.on("codeUpdate", onCode);
        socketService.on("studentCount", onCount);
        socketService.on("blockSolved",  () => onSolved(true));
        socketService.on("blockUnsolved", () => onUnsolved(false));
        socketService.on("redirectToLobby", onRedirect);
        socketService.on("hintRevealed", (hint) => {
            onHint(prev => [...prev, hint]);
        });

        return () => socketService.disconnect();

    }, [codeBlockId, initialCode]);
}
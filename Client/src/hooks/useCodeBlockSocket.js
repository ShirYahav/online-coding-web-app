import socketService from "@/services/socketService";
import { useEffect } from "react"

export const useCodeBlockSocket = (codeBlockId, initialCode, { onRole, onCode, onCount, onSolved, onUnsolved, onRedirect }) => {
    useEffect(() => {
        socketService.connect();
        socketService.emit("joinCodeBlock", {
            codeBlockId,
            initialCode,
        });
        socketService.on("setRole", onRole);
        socketService.on("codeUpdate", onCode);
        socketService.on("studentCount", onCount);
        socketService.on("blockSolved",  () => onSolved(true));
        socketService.on("blockUnsolved", () => onUnsolved(false));
        socketService.on("redirectToLobby", onRedirect);

        return () => socketService.disconnect();

    }, [codeBlockId, initialCode]);
}
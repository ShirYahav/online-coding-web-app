import config from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCodeBlockData = (codeBlockId) => {
  const [block, setBlock] = useState(null);

  useEffect(() => {
    axios
      .get(config.getCodeBlocks + codeBlockId)
      .then((response) => setBlock(response.data))
      .catch(console.error);
  }, [codeBlockId]);

  return block;
};

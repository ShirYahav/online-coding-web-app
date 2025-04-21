import config from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCodeBlockData = (codeBlockId) => {
  const [block, setBlock] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(config.getCodeBlocks + codeBlockId)
      .then((response) => setBlock(response.data))
      .catch((error) => {
        console.log(error);
        navigate("/not-found");
      });
  }, [codeBlockId]);

  return block;
};

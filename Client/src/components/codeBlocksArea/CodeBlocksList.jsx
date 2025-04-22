import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../utils/config";
import CodeBlockCard from "./CodeBlockCard";

const CodeBlocksList = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await axios.get(config.getCodeBlocks);
        setCodeBlocks(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCodeBlocks();
  }, []);

  return (
    <div className="codeBlocks grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
      {codeBlocks.map((c) => (
        <CodeBlockCard key={c._id} codeBlock={c} />
      ))}
    </div>
  );
};

export default CodeBlocksList;

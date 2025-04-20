import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../utils/config";

const CodeBlockEditor = () => {
  const { codeBlockId } = useParams();
  const [codeBlock, setCodeBlock] = useState();

  useEffect(() => {
    const fetchCodeBlockById = async () => {
      try {
        const response = await axios.get(config.getCodeBlocks + codeBlockId);
        setCodeBlock(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCodeBlockById();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center font-bold p-15">
        {codeBlock?.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-3 ml-[13%]">
        {codeBlock?.description}
      </p>
      <Textarea
        defaultValue={codeBlock?.template}
        className="w-[75%] h-[400px] bg-muted mx-auto rounded-md p-5"
      />
    </>
  );
};

export default CodeBlockEditor;

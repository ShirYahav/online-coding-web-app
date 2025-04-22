import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import 'highlight.js/styles/github-dark.css';
import { useNavigate } from "react-router-dom";

hljs.registerLanguage("javascript", javascript);

const CodeBlockCard = (props) => {
  const { _id, title, description, template } = props.codeBlock;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/codeBlocks/${_id}`);
  };

  return (
    <Card className="w-full cursor-pointer" onClick={handleClick}>
      <CardHeader className="h-[20%]">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[80%] flex flex-col justify-end mt-6">
        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(template, { language: "javascript" })
                .value,
            }}
          />
        </pre>
      </CardContent>
    </Card>
  );
};

export default CodeBlockCard;

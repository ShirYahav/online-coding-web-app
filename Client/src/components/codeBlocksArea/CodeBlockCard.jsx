import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CodeBlockCard = (props) => {
  const { _id ,title, description, template } = props.codeBlock;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/codeBlocks/${_id}`)
  }

  return (
    <Card className="w-[100%] mx-auto cursor-pointer" onClick={handleClick}>
      <CardHeader className="h-[20%]">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[80%] flex flex-col justify-end mt-6">
        <p className="text-sm text-muted-foreground mb-2">Preview:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>{template}</code>
        </pre>
      </CardContent>
    </Card>
  );
};

export default CodeBlockCard;

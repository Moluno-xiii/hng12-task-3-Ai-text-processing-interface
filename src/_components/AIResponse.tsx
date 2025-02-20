import { useUserTextContext } from "../_contexts/UserPromptContext";
import Spinner from "./ui/Spinner";

type Props = {
  response: string;
};

const AIResponse: React.FC<Props> = ({ response }) => {
  const { isLoading, aiResponse } = useUserTextContext();

  if (isLoading) return <Spinner />;

  return (
    <div aria-labelledby="AI's response" className=" flex flex-col">
      {aiResponse.length >= 1 && (
        <div
          className=" p-4 max-sm:ml-5 max-w-2xl bg-secondary rounded-4xl self-start"
          aria-labelledby="Ai response container"
        >
          {response}
        </div>
      )}
    </div>
  );
};

export default AIResponse;

import { useUserPromptContext } from "../_contexts/UserPromptContext";

type Props = {
  index: number;
};

const AIResponse: React.FC<Props> = ({ index }) => {
  const { chats } = useUserPromptContext();

  const response = chats[index] || { aiResponse: "" };

  return (
    <div aria-labelledby="AI's response" className="flex flex-col">
      {response.aiResponse && (
        <div
          className="p-4 max-sm:ml-5 max-w-2xl bg-secondary rounded-4xl self-start"
          aria-labelledby="AI response container"
        >
          {response.aiResponse}
        </div>
      )}
    </div>
  );
};

export default AIResponse;

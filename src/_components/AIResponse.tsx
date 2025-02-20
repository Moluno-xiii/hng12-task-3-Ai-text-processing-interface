import { useUserTextContext } from "../_contexts/UserPromptContext";

type Props = {
  response: string;
};

const AIResponse: React.FC<Props> = ({ response }) => {
  const { isLoading } = useUserTextContext();

  if (isLoading) return <span className="self-start">Loading...</span>;
  return (
    <div
      aria-labelledby="AI's response"
      className=" p-4 max-sm:ml-10 max-w-2xl bg-secondary rounded-4xl self-start"
    >
      {response}
    </div>
  );
};

export default AIResponse;

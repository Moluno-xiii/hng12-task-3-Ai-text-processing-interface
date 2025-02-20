import { useUserTextContext } from "../_contexts/UserPromptContext";
import { summarizeText } from "../_utils/apiCalls";

type Props = {
  prompt: string;
};

const UserPrompt: React.FC<Props> = ({ prompt }) => {
  const {
    detectedLanguage,
    errorMessage,
    setErrorMessage,
    setIsLoading,
    setAiResponse,
    userPrompt,
  } = useUserTextContext();
  const handleSummarize = () => {
    summarizeText({
      errorCallback: setErrorMessage,
      loadingCallback: setIsLoading,
      setterCallback: setAiResponse,
      text: userPrompt,
    });
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="p-4 flex flex-col gap-y-2 max-sm:mr-10 max-w-2xl bg-primary rounded-4xl self-end">
        {prompt}
        {prompt.split(" ").length > 150 && (
          <button className="self-end" onClick={handleSummarize}>
            Summarize
          </button>
        )}
      </div>
      <div>
        <span className="text-red-400 text-2xl">{errorMessage}</span>
      </div>
      <span className="text-xs italic self-end text-white font-macondo">
        {detectedLanguage.length >= 1 &&
          `Detected Language : ${detectedLanguage}`}
      </span>
    </div>
  );
};

export default UserPrompt;

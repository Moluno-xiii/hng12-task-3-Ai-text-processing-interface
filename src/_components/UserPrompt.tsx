import { languages } from "..";
import { useUserTextContext } from "../_contexts/UserPromptContext";
import { summarizeText, translateLanguage } from "../_utils/apiCalls";
import SelectComponent from "./ui/SelectComponent";

type Props = {
  prompt: string;
};

const UserPrompt: React.FC<Props> = ({ prompt }) => {
  const {
    isLoading,
    errorMessage,
    detectedLanguage,
    selectedLanguage,
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

  const handleTranslate = () => {
    translateLanguage({
      errorCallback: setErrorMessage,
      loadingCallback: setIsLoading,
      setterCallback: setAiResponse,
      text: userPrompt,
      targetLanguage: selectedLanguage,
      sourceLanguage: detectedLanguage,
    });
  };

  return (
    <div className="flex flex-col gap-y-2">
      {prompt.length >= 1 && (
        <div
          className="p-4 flex flex-col gap-y-2 max-sm:mr-5 max-w-2xl bg-primary rounded-4xl self-end"
          aria-labelledby=" user's prompt"
        >
          {prompt}
          {prompt.split(" ").length > 150 && detectedLanguage === "en" && (
            <button
              className="self-end"
              onClick={handleSummarize}
              disabled={isLoading}
              aria-labelledby="summarize text button"
            >
              Summarize
            </button>
          )}
          <div className="self-end gap-x-4 flex flex-row items-center">
            <SelectComponent />
            <button
              disabled={selectedLanguage === detectedLanguage || isLoading}
              onClick={handleTranslate}
              aria-labelledby="translate text button"
            >
              Translate
            </button>
          </div>
        </div>
      )}
      <div>
        <span aria-labelledby="error message" className="text-red-400 text-2xl">
          {errorMessage}
        </span>
      </div>
      <span
        className="text-xs italic self-end text-white font-macondo"
        aria-labelledby="detected language"
      >
        {detectedLanguage?.length >= 1 &&
          `Detected Language : ${
            languages[detectedLanguage as keyof typeof languages]
          }`}
      </span>
    </div>
  );
};

export default UserPrompt;

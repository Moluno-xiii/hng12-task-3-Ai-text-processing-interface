import { languages } from "..";
import { useUserPromptContext } from "../_contexts/UserPromptContext";
import { summarizeText, translateLanguage } from "../_utils/apiCalls";
import SelectComponent from "./ui/SelectComponent";

type Props = {
  index: number;
};

const UserPrompt: React.FC<Props> = ({ index }) => {
  const {
    isLoading,
    errorMessage,
    selectedLanguage,
    setErrorMessage,
    setIsLoading,
    chats,
    setChats,
  } = useUserPromptContext();

  const chat = chats[index];

  const handleSummarize = () => {
    summarizeText({
      errorCallback: setErrorMessage,
      loadingCallback: setIsLoading,
      setterCallback: callbackSetter,
      text: chat.userPrompt,
    });
  };

  const callbackSetter = (translatedText: string) => {
    setChats((prevChats) =>
      prevChats.map((c) =>
        c.id === chat.id ? { ...c, aiResponse: translatedText } : c
      )
    );
  };

  const handleTranslate = () => {
    translateLanguage({
      errorCallback: setErrorMessage,
      loadingCallback: setIsLoading,
      setterCallback: callbackSetter,
      text: chat.userPrompt,
      targetLanguage: selectedLanguage,
      sourceLanguage: chat.detectedLanguage,
    });
  };

  return (
    <div className="flex flex-col gap-y-2">
      {chat.userPrompt.length >= 1 && (
        <div
          className="p-4 flex flex-col gap-y-2 max-sm:mr-5 max-w-2xl bg-primary rounded-4xl self-end"
          aria-labelledby=" user's prompt"
        >
          {chat.userPrompt}
          {chat.userPrompt.split(" ").length > 150 &&
            chat.detectedLanguage === "en" && (
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
              disabled={selectedLanguage === chat.detectedLanguage || isLoading}
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
        Detected Language:{" "}
        {languages[chat.detectedLanguage as keyof typeof languages] ??
          "Unknown"}
      </span>
    </div>
  );
};

export default UserPrompt;

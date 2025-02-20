import { useRef, useState } from "react";
import { useUserPromptContext } from "../_contexts/UserPromptContext";
import { BsFillSendFill } from "react-icons/bs";
import { detectLanguage } from "../_utils/apiCalls";

const UserTextBox: React.FC = () => {
  const { setIsLoading, setErrorMessage, handleChat, updateChat, chats } =
    useUserPromptContext();
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDetectLanguage = (chatId: string) => {
    detectLanguage({
      errorCallback: setErrorMessage,
      loadingCallback: setIsLoading,
      setterCallback: (language) => {
        if (typeof language === "string") {
          updateChat(chatId, "detectedLanguage", language);
        }
      },
      text: value,
    });
  };

  const handleSetValue = () => {
    if (!value.trim()) return;

    const chatId = crypto.randomUUID();
    handleChat({
      id: chatId,
      userPrompt: value,
      detectedLanguage: "",
      aiResponse: "",
    });

    setValue("");
    handleDetectLanguage(chatId);

    if (textareaRef.current) {
      textareaRef.current.style.height = "3rem";
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSetValue();
    }
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-7xl p-4 flex flex-col gap-y-2 rounded-3xl">
      {chats.length < 1 && (
        <span className="italic text-center font-macondo md:text-5xl text-2xl ">
          Welcome, What can i help you with Today?
        </span>
      )}
      <div className="flex bg-dark border border-indigo p-4 flex-col gap-y-2 rounded-3xl sticky bottom-4">
        <textarea
          ref={textareaRef}
          className="focus:outline-none placeholder:italic max-h-[200px] overflow-auto resize-none"
          onInput={adjustHeight}
          style={{ height: "3rem" }}
          placeholder="Enter prompt..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
        />

        <button
          onClick={handleSetValue}
          hidden={value.length < 1}
          className="self-end"
        >
          <BsFillSendFill className="text-indigo" />
        </button>
      </div>
    </div>
  );
};

export default UserTextBox;

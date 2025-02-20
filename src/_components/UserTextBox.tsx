import { useRef, useState } from "react";
import { useUserTextContext } from "../_contexts/UserPromptContext";
import { BsFillSendFill } from "react-icons/bs";
import { detectLanguage } from "../_utils/apiCalls";

const UserTextBox: React.FC = () => {
  const {
    userPrompt,
    errorMessage,
    setIsLoading,
    handleUserPrompt,
    setErrorMessage,
    setDetectedLanguage,
  } = useUserTextContext();
  const [value, setValue] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDetectLanguage = () => {
    detectLanguage({
      errorCallback: setErrorMessage,
      loadingCallback: setIsLoading,
      setterCallback: setDetectedLanguage,
      text: value,
    });
  };

  const handleSetValue = () => {
    if (!value.trim()) return;
    handleUserPrompt(value);
    setValue("");
    handleDetectLanguage();

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
      {userPrompt.length < 1 && (
        <span
          className="flex flex-col text-center text-3xl md:text-5xl uppercase font-macondo"
          aria-labelledby="Welcome text"
        >
          Welcome, What can i do for you today
        </span>
      )}
      <div
        aria-labelledby="user dialog box"
        className="flex bg-dark border border-indigo p-4 flex-col gap-y-2 rounded-3xl sticky bottom-4"
      >
        <textarea
          ref={textareaRef}
          aria-labelledby="user's text prompt"
          name="user-input"
          id="user-input"
          className="focus:outline-none placeholder:italic max-h-[200px] overflow-auto resize-none"
          onInput={adjustHeight}
          style={{ height: "3rem" }}
          placeholder="Enter prompt..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
        />

        <span className="text-red-500" aria-labelledby="error message">
          {errorMessage}
        </span>
        <button
          onClick={handleSetValue}
          hidden={value.length < 1}
          className="self-end"
          aria-labelledby="send user prompt button"
        >
          <BsFillSendFill className="text-indigo" />
        </button>
      </div>
    </div>
  );
};

export default UserTextBox;

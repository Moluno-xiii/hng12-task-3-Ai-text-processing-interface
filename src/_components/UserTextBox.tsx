import { useRef, useState } from "react";
import { useUserTextContext } from "../_contexts/UserPromptContext";
import { BsFillSendFill } from "react-icons/bs";
import { detectLanguage } from "../_utils/apiCalls";

const UserTextBox: React.FC = () => {
  const {
    handleUserPrompt,
    setErrorMessage,
    setIsLoading,
    isLoading,
    errorMessage,
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

  if (isLoading) return <span>Loading...</span>;

  return (
    <div
      aria-labelledby="user dialog box"
      className="mt-auto flex bg-dark border border-indigo p-4 flex-col gap-y-2 rounded-3xl sticky bottom-4"
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

      <span className="text-red-500">{errorMessage}</span>
      <div className="flex justify-end flex-row gap-x-5">
        <button onClick={handleSetValue} hidden={value.length < 1}>
          <BsFillSendFill className="text-indigo" />
        </button>
      </div>
    </div>
  );
};

export default UserTextBox;

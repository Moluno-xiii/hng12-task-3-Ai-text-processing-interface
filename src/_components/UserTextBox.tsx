import { useRef } from "react";

const UserTextBox: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

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
      />

      <div className="flex justify-end flex-row gap-x-5">
        <button>send</button>
        <button>summarize</button>
      </div>
    </div>
  );
};

export default UserTextBox;

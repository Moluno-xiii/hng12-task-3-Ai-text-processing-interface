import { chat_data } from ".";
import AIResponse from "./_components/AIResponse";
import UserPrompt from "./_components/UserPrompt";
import UserTextBox from "./_components/UserTextBox";
import { useUserTextContext } from "./_contexts/UserPromptContext";

function App() {
  const { userPrompt, aiResponse } = useUserTextContext();
  return (
    <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-10 font-roboto space-y-10 md:space-y-20">
      <h1
        aria-labelledby="application name"
        className="text-2xl text-center md:text-4xl font-bold font-macondo mb-5 sticky top-0 py-3 bg-dark"
      >
        AI Text Processing Interface{" "}
      </h1>
      <ul className="space-y-10 md:space-y-20 mb-40">
        {chat_data.map((chat) => (
          <li key={chat.id} className="flex flex-col gap-y-3">
            <UserPrompt prompt={userPrompt} />
            <AIResponse response={aiResponse} />
          </li>
        ))}
      </ul>
      <UserTextBox />
    </div>
  );
}

export default App;

import AIResponse from "./_components/AIResponse";
import Spinner from "./_components/ui/Spinner";
import UserPrompt from "./_components/UserPrompt";
import UserTextBox from "./_components/UserTextBox";
import { useUserPromptContext } from "./_contexts/UserPromptContext";

function App() {
  const { chats, isLoading } = useUserPromptContext();
  if (isLoading) return <Spinner />;
  return (
    <div className="max-w-7xl mx-auto px-3 py-4 md:px-6 md:py-10 font-roboto space-y-10 md:space-y-20">
      <h1
        aria-labelledby="application name"
        className="text-3xl text-center md:text-6xl font-bold font-macondo mb-5 sticky top-0 py-3 bg-dark"
      >
        AI Text Processing Interface{" "}
      </h1>
      <ul className="space-y-10 md:space-y-20 mb-40">
        {chats.map((chat, index) => (
          <li key={chat.id} className="flex flex-col gap-y-3">
            <UserPrompt index={index} key={index} />
            <AIResponse index={index} key={index + 1} />
          </li>
        ))}
      </ul>
      <UserTextBox />
    </div>
  );
}

export default App;

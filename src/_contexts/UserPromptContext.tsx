import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InitialState = {
  chats: {
    id: string;
    detectedLanguage: string;
    aiResponse: string;
    userPrompt: string;
  }[];
  isLoading: boolean;
  errorMessage: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  detectedLanguage: string;
  setSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedLanguage: string;
  handleChat: (chat: Chat) => void;
  updateChat: <K extends keyof Chat>(
    id: string,
    field: K,
    value: Chat[K]
  ) => void;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
};

type Chat = {
  id: string;
  detectedLanguage: string;
  aiResponse: string;
  userPrompt: string;
};

const initialState: InitialState = {
  chats: [],
  isLoading: false,
  errorMessage: "",
  setIsLoading: () => {},
  setErrorMessage: () => {},
  detectedLanguage: "",
  setChats: () => {},
  selectedLanguage: "",
  setSelectedLanguage: () => {},
  handleChat: () => {},
  updateChat: () => {},
};

const UserTextContext = createContext(initialState);

const UserTextContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [chats, setChats] = useState<
    {
      id: string;
      detectedLanguage: string;
      aiResponse: string;
      userPrompt: string;
    }[]
  >([]);

  const handleChat = (chat: Chat) => {
    setChats((prevChats) => [...prevChats, chat]);
  };

  const updateChat = <K extends keyof Chat>(
    id: string,
    field: K,
    value: Chat[K]
  ) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === id ? { ...chat, [field]: value } : chat
      )
    );
  };

  return (
    <UserTextContext.Provider
      value={{
        isLoading,
        errorMessage,
        chats,
        selectedLanguage,
        detectedLanguage,
        setIsLoading,
        setErrorMessage,
        setSelectedLanguage,
        handleChat,
        updateChat,
        setChats,
      }}
    >
      {children}
    </UserTextContext.Provider>
  );
};

const useUserPromptContext = () => {
  const context = useContext(UserTextContext);
  if (!context)
    throw new Error("UserTextContext was used outside of it's scope");
  return context;
};

export { UserTextContextProvider, useUserPromptContext };

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InitialState = {
  userPrompt: string;
  aiResponse: string;
  handleUserPrompt: (text: string) => void;
  setAiResponse: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  errorMessage: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setDetectedLanguage: Dispatch<SetStateAction<string>>;
  detectedLanguage: string;
};

const initialState: InitialState = {
  userPrompt: "",
  aiResponse: "",
  handleUserPrompt: () => {},
  setAiResponse: () => {},
  isLoading: false,
  errorMessage: "",
  setIsLoading: () => {},
  setErrorMessage: () => {},
  detectedLanguage: "",
  setDetectedLanguage: () => {},
};

const UserTextContext = createContext(initialState);

const UserTextContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState("");

  // remember to use a reducer for this instead

  const handleUserPrompt = (text: string) => {
    setUserPrompt(text);
  };

  return (
    <UserTextContext.Provider
      value={{
        userPrompt,
        aiResponse,
        setAiResponse,
        handleUserPrompt,
        isLoading,
        errorMessage,
        setErrorMessage,
        setIsLoading,
        detectedLanguage,
        setDetectedLanguage,
      }}
    >
      {children}
    </UserTextContext.Provider>
  );
};

const useUserTextContext = () => {
  const context = useContext(UserTextContext);
  if (!context)
    throw new Error("UserTextContext was used outside of it's scope");
  return context;
};

export { UserTextContextProvider, useUserTextContext };

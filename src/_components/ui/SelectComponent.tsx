import { useUserTextContext } from "../../_contexts/UserPromptContext";

const languages: { language: string; value: string }[] = [
  {
    language: "English",
    value: "en",
  },
  {
    language: "Portuguese",
    value: "pt",
  },
  {
    language: "Russian",
    value: "ru",
  },
  {
    language: "Turkish",
    value: "tr",
  },
  {
    language: "French",
    value: "fr",
  },
  {
    language: "Spanish",
    value: "es",
  },
];

const SelectComponent: React.FC = () => {
  const { isLoading, selectedLanguage, setSelectedLanguage } =
    useUserTextContext();

  const onChangeOption = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <select
      className="p-3 rounded-md bg-cyan-700"
      value={selectedLanguage}
      disabled={isLoading}
      onChange={(e) => onChangeOption(e.target.value)}
      aria-labelledby="select language to translate to"
    >
      {languages.map(({ language, value }) => (
        <option
          className=" text-white"
          value={value}
          key={value}
          aria-labelledby={value}
        >
          {language}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;

import { useState } from "react";

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

type PropTypes = {
  handleSelectOption: (text: string) => void;
};

const SelectComponent: React.FC<PropTypes> = ({ handleSelectOption }) => {
  const [option, setOption] = useState("en");

  const handleChangeOption = (text: string) => {
    setOption(text);
    handleSelectOption(text);
  };

  return (
    <select value={option} onChange={(e) => e.target.value}>
      {languages.map(({ language, value }) => (
        <option
          value={value}
          key={value}
          onClick={() => handleChangeOption(value)}
        >
          {language}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;

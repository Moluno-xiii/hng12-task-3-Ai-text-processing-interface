type Props = {
  response: string;
};

const AIResponse: React.FC<Props> = ({ response }) => {
  return (
    <div
      aria-labelledby="AI's response"
      className=" p-4 max-sm:ml-10 max-w-2xl bg-secondary rounded-4xl self-start"
    >
      {response}
    </div>
  );
};

export default AIResponse;

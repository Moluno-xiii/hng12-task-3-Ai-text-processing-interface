type Props = {
  response: string;
};

const AIResponse: React.FC<Props> = ({ response }) => {
  return (
    <div
      aria-labelledby="AI's response"
      className=" p-4 max-sm:ml-10 max-w-2xl bg-primary rounded-4xl self-end"
    >
      {response}
    </div>
  );
};

export default AIResponse;

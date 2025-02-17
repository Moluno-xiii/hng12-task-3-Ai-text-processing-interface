type Props = {
  prompt: string;
};

const UserPrompt: React.FC<Props> = ({ prompt }) => {
  return (
    <div className="p-4 max-sm:mr-10 max-w-2xl bg-primary rounded-4xl self-end">
      {prompt}
    </div>
  );
};

export default UserPrompt;

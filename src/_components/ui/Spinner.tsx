const Spinner = () => {
  return (
    <div
      className="flex flex-col gap-y-2 items-center h-dvh w-dvw justify-center self-start"
      aria-labelledby="Loading indicator"
    >
      <div className="size-20 border-4 border-t-transparent border-secondary rounded-full animate-spin"></div>
      <span>Please be patient, Summarizer API takes a while.</span>
    </div>
  );
};

export default Spinner;

/* eslint-disable @typescript-eslint/no-explicit-any */
type ApiCall = {
  loadingCallback: React.Dispatch<React.SetStateAction<boolean>>;
  errorCallback: React.Dispatch<React.SetStateAction<string>>;
  setterCallback?: React.Dispatch<React.SetStateAction<string>>;
  text?: string;
};

const handleSummarize = async ({ loadingCallback, errorCallback }: ApiCall) => {
  try {
    loadingCallback(true);
    const response = await fetch("");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error.message);
    errorCallback(error.message);
  } finally {
    loadingCallback(false);
  }
};

const handleTranslate = async ({ loadingCallback, errorCallback }: ApiCall) => {
  try {
    loadingCallback(true);
    const response = await fetch("");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error.message);
    errorCallback(error.message);
  } finally {
    loadingCallback(false);
  }
};

const handleDetect = async ({ loadingCallback, errorCallback }: ApiCall) => {
  try {
    loadingCallback(true);
    const response = await fetch("");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error.message);
    errorCallback(error.message);
  } finally {
    loadingCallback(false);
  }
};

const detectLanguage = async ({
  errorCallback,
  loadingCallback,
  setterCallback,
  text,
}: ApiCall) => {
  if ("ai" in self && "languageDetector" in (self.ai as any)) {
    try {
      errorCallback("");
      loadingCallback(true);
      const languageDetectorCapabilities = await (
        self.ai as any
      ).languageDetector.capabilities();
      const canDetect = languageDetectorCapabilities.capabilities;
      let detector;

      if (canDetect === "no") {
        console.error("Language detection is not available.");
        errorCallback("Language detection is not available.");
        return;
      }

      if (canDetect === "readily") {
        detector = await (self.ai as any).languageDetector.create();
      } else {
        detector = await (self.ai as any).languageDetector.create({
          monitor(m: any) {
            m.addEventListener("downloadprogress", (e: any) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
        await detector.ready;
      }

      const results = await detector.detect(text);
      if (results.length > 0) {
        const detectedLanguage = results[0].detectedLanguage;
        console.log(`Detected Language: ${detectedLanguage}`);

        if (setterCallback) {
          setterCallback(detectedLanguage);
        }
      } else {
        console.log("No language detected.");
        if (setterCallback) {
          setterCallback("unknown");
        }
      }
    } catch (error) {
      console.error("Error detecting language:", error);
      errorCallback("Error detecting language");
    } finally {
      loadingCallback(false);
    }
  } else {
    errorCallback(
      "Language detector API is not available in this environment."
    );
    console.error(
      "Language Detector API is not available in this environment."
    );
  }
};
const summarizeText = async ({
  errorCallback,
  loadingCallback,
  setterCallback,
  text,
}: ApiCall) => {
  if ("ai" in self && "summarizer" in (self.ai as any)) {
    const options = {
      sharedContext: text,
      type: "key-points",
      format: "markdown",
      length: "medium",
    };

    try {
      errorCallback("");
      loadingCallback(true);
      const available = (await (self.ai as any).summarizer.capabilities())
        .available;
      let summarizer;
      if (available === "no") {
        return;
      }
      if (available === "readily") {
        summarizer = await (self.ai as any).summarizer.create(options);
      } else {
        summarizer = await (self.ai as any).summarizer.create(options);
        summarizer.addEventListener("downloadprogress", (e: any) => {
          console.log(e.loaded, e.total);
        });
        await summarizer.ready;
      }

      const summary = await summarizer.summarize(text, {
        context: "This article is intended for a tech-savvy audience.",
      });

      if (setterCallback) {
        setterCallback(summary);
      }
      console.log(summary);
    } catch (error) {
      console.error("Error detecting language:", error);
      errorCallback("Error detecting language");
    } finally {
      loadingCallback(false);
    }
  } else {
    errorCallback(
      "Language detector API is not available in this environment."
    );
    console.error(
      "Language Detector API is not available in this environment."
    );
  }
};

export {
  handleSummarize,
  handleTranslate,
  handleDetect,
  detectLanguage,
  summarizeText,
};

/* eslint-disable @typescript-eslint/no-explicit-any */

type ApiCall = {
  loadingCallback: React.Dispatch<React.SetStateAction<boolean>>;
  errorCallback: React.Dispatch<React.SetStateAction<string>>;
  setterCallback?: (text: string) => void;
  text?: string;
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
      format: "plain-text",
      length: "short",
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
      console.error("Error summarizing article:", error);
      errorCallback("Error summarizing article");
    } finally {
      loadingCallback(false);
    }
  } else {
    errorCallback("Summarizer API is not available in this environment.");
    console.error("Summarizer API is not available in this environment.");
  }
};

const translateLanguage = async ({
  errorCallback,
  loadingCallback,
  setterCallback,
  text,
  sourceLanguage,
  targetLanguage,
}: ApiCall & { sourceLanguage: string; targetLanguage: string }) => {
  if ("ai" in self && "translator" in (self.ai as any)) {
    try {
      errorCallback("");
      loadingCallback(true);
      const translator = await (self.ai as any).translator.create({
        sourceLanguage,
        targetLanguage,
      });
      const result = await translator.translate(text);
      if (setterCallback) {
        setterCallback(result);
      }
      console.log(result);
    } catch (error) {
      console.error(
        "Error detecting language:",
        error,
        "targe la:",
        targetLanguage,
        "source Lan:",
        sourceLanguage
      );
      errorCallback("An error occured while translating language");
    } finally {
      loadingCallback(false);
    }
  } else {
    errorCallback(
      "Language translation API is not available in this environment."
    );
    console.error(
      "Language translation API is not available in this environment."
    );
  }
};

export { detectLanguage, summarizeText, translateLanguage };

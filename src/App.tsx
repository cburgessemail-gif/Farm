function useSpeech() {
  const [enabled, setEnabled] = useState(false);

  const speak = (text: string, lang: string) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const parts = text
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    let index = 0;

    const speakNext = () => {
      if (index >= parts.length) return;

      const utterance = new SpeechSynthesisUtterance(parts[index]);
      utterance.lang = lang;
      utterance.rate = 0.96;
      utterance.pitch = 1;

      utterance.onend = () => {
        index += 1;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const stop = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setEnabled(false);
  };

  return { enabled, setEnabled, speak, stop };
}

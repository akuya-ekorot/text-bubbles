import { KeyboardEventHandler, useEffect, useState } from "react";

interface TextBubbleProps {
  text: string;
  active?: boolean;
}

const TextBubble: React.FC<TextBubbleProps> = ({ text, active }) => {
  const [kms, setKms] = useState(false);

  const isActive = active;
  const hasContent = !!text;

  useEffect(() => {
    if (active) return;

    const timer = setTimeout(() => setKms(true), 3900);

    return () => {
      clearTimeout(timer);
    };
  }, [active]);

  if (kms) return null;

  return (
    <div
      className={`${hasContent ? "visible" : "invisible"} ${isActive ? "bg-[#26233a]" : "bg-[#1f1d2e] animate-fade"} rounded-full rounded-bl-none px-4 py-2 border border-[#524f67] min-h-14`}
    >
      <p>{text}</p>
    </div>
  );
};

function App() {
  const [previousTexts, setPreviousTexts] = useState<React.ReactNode[]>([]);
  const [text, setText] = useState("");

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case "Enter":
        // Add current text to previousTexts
        setPreviousTexts((prev) => [...prev, <TextBubble text={text} />]);
        setText("");
        break;
      case "Delete":
      case "Backspace":
        setText((prev) => prev.slice(0, prev.length - 1));
        break;
      case "Control":
      case "Alt":
      case "AltGraph":
      case "Shift":
      case "Home":
      case "End":
      case "PageUp":
      case "PageDown":
      case "Escape":
      case "Tab":
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        break;

      default:
        setText((prev) => prev + e.key);
        break;
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="overflow-hidden bg-[#191724] text-[#e0def4] text-3xl p-4 h-screen flex flex-col items-start justify-end gap-2 shadow"
    >
      {previousTexts}
      <TextBubble text={text} active />
    </div>
  );
}

export default App;

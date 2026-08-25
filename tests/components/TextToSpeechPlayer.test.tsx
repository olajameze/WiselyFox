import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { TextToSpeechPlayer } from "@/components/accessibility/TextToSpeechPlayer";

describe("TextToSpeechPlayer component", () => {
  const mockSpeak = vi.fn();
  const mockCancel = vi.fn();
  const mockPause = vi.fn();
  const mockResume = vi.fn();

  beforeEach(() => {
    class MockSpeechSynthesisUtterance {
      text: string;
      rate = 1;
      pitch = 1;
      lang = "en-GB";
      voice: unknown = null;
      onstart: (() => void) | null = null;
      onend: (() => void) | null = null;
      onerror: ((e: unknown) => void) | null = null;
      onpause: (() => void) | null = null;
      onresume: (() => void) | null = null;

      constructor(text?: string) {
        this.text = text ?? "";
      }
    }
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      writable: true,
      value: MockSpeechSynthesisUtterance,
    });

    Object.defineProperty(window, "speechSynthesis", {
      writable: true,
      value: {
        speak: mockSpeak,
        cancel: mockCancel,
        pause: mockPause,
        resume: mockResume,
        getVoices: () => [{ name: "English UK", lang: "en-GB" }],
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the player button when speech synthesis is supported", () => {
    render(<TextToSpeechPlayer text="Hello, welcome to WiselyFox!" />);
    const button = screen.getByRole("button", { name: /read aloud/i });
    expect(button).toBeInTheDocument();
  });

  it("triggers speak when the audio button is clicked", () => {
    render(<TextToSpeechPlayer text="Hello, welcome to WiselyFox!" />);
    const button = screen.getByRole("button", { name: /read aloud/i });
    fireEvent.click(button);
    expect(mockSpeak).toHaveBeenCalledTimes(1);
  });
});

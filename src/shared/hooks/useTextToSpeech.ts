"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface UseTextToSpeechOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  voice?: SpeechSynthesisVoice | null;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent | Error) => void;
  onPause?: () => void;
  onResume?: () => void;
}

export function useTextToSpeech(options: UseTextToSpeechOptions = {}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const activeTextRef = useRef<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };

      updateVoices();
      window.speechSynthesis.addEventListener("voiceschanged", updateVoices);

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
        // Instant audio cancellation upon unmounting
        try {
          window.speechSynthesis.cancel();
        } catch {
          /* noop */
        }
      };
    }
  }, []);

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* noop */
    }
    setIsPlaying(false);
    setIsPaused(false);
    utteranceRef.current = null;
    activeTextRef.current = "";
  }, []);

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.pause();
      setIsPaused(true);
      options.onPause?.();
    } catch {
      /* noop */
    }
  }, [options]);

  const resume = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.resume();
      setIsPaused(false);
      options.onResume?.();
    } catch {
      /* noop */
    }
  }, [options]);

  const speak = useCallback(
    (textToSpeak?: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const rawText = textToSpeak ?? activeTextRef.current;
      if (!rawText || !rawText.trim()) return;

      // Clean text of markdown/tags
      const cleanText = rawText.replace(/<[^>]+>/g, "").replace(/[*_#`~]/g, "").trim();
      if (!cleanText) return;

      cancel();

      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = options.rate ?? 0.95;
        utterance.pitch = options.pitch ?? 1.0;
        utterance.lang = options.lang ?? "en-GB";

        if (options.voice) {
          utterance.voice = options.voice;
        } else if (voices.length > 0) {
          // Prefer natural English voices
          const preferredVoice =
            voices.find((v) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Neural"))) ||
            voices.find((v) => v.lang.startsWith("en")) ||
            voices[0];
          if (preferredVoice) utterance.voice = preferredVoice;
        }

        utterance.onstart = () => {
          setIsPlaying(true);
          setIsPaused(false);
          options.onStart?.();
        };

        utterance.onend = () => {
          setIsPlaying(false);
          setIsPaused(false);
          utteranceRef.current = null;
          options.onEnd?.();
        };

        utterance.onerror = (e) => {
          setIsPlaying(false);
          setIsPaused(false);
          utteranceRef.current = null;
          options.onError?.(e);
        };

        utterance.onpause = () => {
          setIsPaused(true);
          options.onPause?.();
        };

        utterance.onresume = () => {
          setIsPaused(false);
          options.onResume?.();
        };

        utteranceRef.current = utterance;
        activeTextRef.current = cleanText;

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        setIsPlaying(false);
        setIsPaused(false);
        options.onError?.(err instanceof Error ? err : new Error(String(err)));
      }
    },
    [cancel, options, voices],
  );

  return {
    speak,
    pause,
    resume,
    cancel,
    isPlaying,
    isPaused,
    isSupported,
    voices,
  };
}

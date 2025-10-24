"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once.",
  "In the heart of the city, there's a small café where writers gather to share their stories and dreams.",
  "Technology has transformed the way we communicate, work, and learn in the modern world.",
  "Every expert was once a beginner who refused to give up on their passion and dreams.",
  "The future belongs to those who believe in the beauty of their dreams and work towards them.",
  "Consistency is the key to success. Practice makes perfect, and dedication leads to excellence.",
  "The art of writing is the art of discovering what you believe. Great writers inspire and transform.",
  "Learning to code is like learning a new language. It opens doors to endless possibilities.",
  "Patience and persistence are virtues that lead to great achievements in life and work.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
];

interface TypingAreaProps {
  onStatsUpdate: (stats: any) => void;
}

export default function TypingArea({ onStatsUpdate }: TypingAreaProps) {
  const [currentText, setCurrentText] = useState(SAMPLE_TEXTS[0]);
  const [userInput, setUserInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestWPM, setBestWPM] = useState(0);
  const [bestAccuracy, setBestAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, startTime]);

  // Calculate stats
  useEffect(() => {
    const correctChars = userInput
      .split("")
      .filter((char, i) => char === currentText[i]).length;
    const totalChars = userInput.length;
    const accuracy =
      totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);
    const minutes = Math.max(timeElapsed / 60, 0.1);
    const words = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(words / minutes);

    onStatsUpdate({
      wpm: isActive ? wpm : 0,
      accuracy,
      charactersTyped: totalChars,
      correctCharacters: correctChars,
      timeElapsed,
      isActive,
    });
  }, [userInput, timeElapsed, isActive, currentText, onStatsUpdate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!isActive && value.length > 0) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (value.length <= currentText.length) {
      setUserInput(value);
    }

    if (value === currentText) {
      setIsActive(false);
      setIsComplete(true);

      const correctChars = value
        .split("")
        .filter((char, i) => char === currentText[i]).length;
      const accuracy = Math.round((correctChars / value.length) * 100);
      const minutes = Math.max(timeElapsed / 60, 0.1);
      const words = value.trim().split(/\s+/).length;
      const wpm = Math.round(words / minutes);

      if (wpm > bestWPM) setBestWPM(wpm);
      if (accuracy > bestAccuracy) setBestAccuracy(accuracy);
    }
  };

  const handleReset = () => {
    setUserInput("");
    setIsActive(false);
    setStartTime(null);
    setTimeElapsed(0);
    setIsComplete(false);
    const newText =
      SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setCurrentText(newText);
    inputRef.current?.focus();
  };

  const renderText = () => {
    return currentText.split("").map((char, index) => {
      let className = "char-pending";

      if (index < userInput.length) {
        if (userInput[index] === char) {
          className = "char-correct";
        } else {
          className = "char-incorrect";
        }
      }

      if (index === userInput.length) {
        className += " char-current";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Text Display */}
      <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
        <div className="typing-text text-foreground/90 leading-8 break-words">
          {renderText()}
        </div>
      </Card>

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Click here and start typing..."
          className="w-full px-6 py-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          autoFocus
        />
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex-1 md:flex-none bg-transparent"
        >
          {isComplete ? "Next Paragraph" : "Reset"}
        </Button>
        {isComplete && (
          <div className="flex-1 md:flex-none px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 font-semibold flex items-center justify-center animate-pulse">
            ✓ Complete!
          </div>
        )}
      </div>

      {isComplete && (
        <Card className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-lg">
              Session Complete!
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Best WPM</p>
                <p className="text-2xl font-bold text-primary">{bestWPM}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Best Accuracy</p>
                <p className="text-2xl font-bold text-accent">
                  {bestAccuracy}%
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Click "Next Paragraph" to continue practicing!
            </p>
          </div>
        </Card>
      )}

      {/* Info Text */}
      <p className="text-sm text-muted-foreground text-center">
        {isActive
          ? "⏱️ Typing in progress..."
          : isComplete
          ? "🎉 Great job! Ready for the next one?"
          : "👆 Start typing to begin"}
      </p>
    </div>
  );
}

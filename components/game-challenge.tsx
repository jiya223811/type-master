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

interface GameChallengeProps {
  onStatsUpdate: (stats: any) => void;
}

export default function GameChallenge({ onStatsUpdate }: GameChallengeProps) {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "medium"
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [currentText, setCurrentText] = useState(SAMPLE_TEXTS[0]);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set time limit based on difficulty
  useEffect(() => {
    const limits = { easy: 90, medium: 60, hard: 30 };
    const newLimit = limits[difficulty];
    setTimeLimit(newLimit);
    setTimeRemaining(newLimit);
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setUserInput("");
    setScore(0);
    setTimeRemaining(timeLimit);
    const newText =
      SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setCurrentText(newText);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!gameStarted || gameOver) return;

    const value = e.target.value;

    if (value === currentText) {
      // Correct text typed - add score and get new text
      const correctChars = value.length;
      const points = Math.round(
        (correctChars / 5) *
          (difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 1)
      );
      setScore((prev) => prev + points);

      // Get new text
      const newText =
        SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
      setCurrentText(newText);
      setUserInput("");
    } else if (value.length <= currentText.length) {
      setUserInput(value);
    }
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

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-400";
    }
  };

  const getTimeColor = () => {
    if (timeRemaining > timeLimit / 2) return "text-green-400";
    if (timeRemaining > timeLimit / 4) return "text-yellow-400";
    return "text-red-400";
  };

  if (!gameStarted && !gameOver) {
    return (
      <div className="space-y-6">
        <Card className="p-8 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Typing Challenge
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-3">
                Difficulty Level
              </label>
              <div className="flex gap-3">
                {(["easy", "medium", "hard"] as const).map((level) => (
                  <Button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    variant={difficulty === level ? "default" : "outline"}
                    className="flex-1 capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <p className="text-muted-foreground text-sm">Time Limit</p>
                <p className="text-2xl font-bold text-primary">{timeLimit}s</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border">
                <p className="text-muted-foreground text-sm">Best Score</p>
                <p className="text-2xl font-bold text-accent">{bestScore}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={startGame}
            className="w-full py-6 text-lg font-semibold"
          >
            Start Challenge
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-muted-foreground text-sm">Score</p>
            <p className="text-3xl font-bold text-primary">{score}</p>
          </div>
          <div className="text-center">
            <p className={`text-sm font-medium mb-1 ${getDifficultyColor()}`}>
              {difficulty.toUpperCase()}
            </p>
            <p className={`text-4xl font-bold ${getTimeColor()}`}>
              {timeRemaining}s
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Difficulty</p>
            <p className="text-xl font-bold text-accent capitalize">
              {difficulty}
            </p>
          </div>
        </div>
      </Card>

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
          placeholder="Type the text to score points..."
          className="w-full px-6 py-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          disabled={gameOver}
        />
      </div>

      {gameOver && (
        <Card className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground text-lg">
              Game Over!
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Final Score</p>
                <p className="text-2xl font-bold text-primary">{score}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Best Score</p>
                <p className="text-2xl font-bold text-accent">
                  {Math.max(score, bestScore)}
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                if (score > bestScore) setBestScore(score);
                startGame();
              }}
              className="w-full"
            >
              Play Again
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

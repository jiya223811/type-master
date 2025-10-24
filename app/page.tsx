"use client";

import { useState, useCallback } from "react";
import TypingArea from "@/components/typing-area";
import Stats from "@/components/stats";
import Header from "@/components/header";
import GameMode from "@/components/game-mode";
import Achievements from "@/components/achievements";
import GameChallenge from "@/components/game-challenge";

export default function Home() {
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    charactersTyped: 0,
    correctCharacters: 0,
    timeElapsed: 0,
    isActive: false,
  });

  const [gameMode, setGameMode] = useState<"practice" | "game">("practice");

  const handleStatsUpdate = useCallback((newStats: typeof stats) => {
    setStats(newStats);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-16">
        <GameMode onModeChange={setGameMode} currentMode={gameMode} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main typing area - conditionally render based on gameMode */}
          <div className="lg:col-span-2">
            {gameMode === "practice" ? (
              <TypingArea onStatsUpdate={handleStatsUpdate} />
            ) : (
              <GameChallenge onStatsUpdate={handleStatsUpdate} />
            )}
          </div>

          {/* Stats sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Stats stats={stats} />
            <Achievements stats={stats} />
          </div>
        </div>
      </div>
    </main>
  );
}

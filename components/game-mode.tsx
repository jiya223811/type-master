"use client";
import { Button } from "@/components/ui/button";

interface GameModeProps {
  onModeChange: (mode: "practice" | "game") => void;
  currentMode: "practice" | "game";
}

export default function GameMode({ onModeChange, currentMode }: GameModeProps) {
  return (
    <div className="flex gap-3 mb-6">
      <Button
        onClick={() => onModeChange("practice")}
        variant={currentMode === "practice" ? "default" : "outline"}
        className="flex-1 md:flex-none"
      >
        Practice Mode
      </Button>
      <Button
        onClick={() => onModeChange("game")}
        variant={currentMode === "game" ? "default" : "outline"}
        className="flex-1 md:flex-none"
      >
        Game Mode
      </Button>
    </div>
  );
}

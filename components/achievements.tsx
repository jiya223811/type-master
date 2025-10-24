"use client";

import { Card } from "@/components/ui/card";

interface AchievementsProps {
  stats: {
    wpm: number;
    accuracy: number;
    charactersTyped: number;
    correctCharacters: number;
    timeElapsed: number;
    isActive: boolean;
  };
}

export default function Achievements({ stats }: AchievementsProps) {
  const achievements = [
    { name: "Speed Demon", condition: stats.wpm >= 100, icon: "⚡" },
    { name: "Perfect Accuracy", condition: stats.accuracy === 100, icon: "🎯" },
    { name: "Consistent", condition: stats.accuracy >= 95, icon: "✨" },
    { name: "Marathon", condition: stats.timeElapsed >= 300, icon: "🏃" },
    { name: "Typer", condition: stats.charactersTyped >= 500, icon: "⌨️" },
  ];

  const unlockedAchievements = achievements.filter((a) => a.condition);

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Achievements
        </h3>
        <p className="text-sm text-muted-foreground">
          {unlockedAchievements.length} unlocked
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.name}
            className={`p-3 rounded-lg border transition-all ${
              achievement.condition
                ? "bg-primary/20 border-primary/50"
                : "bg-muted/20 border-muted/30 opacity-50"
            }`}
          >
            <div className="text-2xl mb-1">{achievement.icon}</div>
            <p className="text-xs font-medium text-foreground">
              {achievement.name}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

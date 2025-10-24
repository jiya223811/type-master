"use client";

import { Card } from "@/components/ui/card";

interface StatsProps {
  stats: {
    wpm: number;
    accuracy: number;
    charactersTyped: number;
    correctCharacters: number;
    timeElapsed: number;
    isActive: boolean;
  };
}

export default function Stats({ stats }: StatsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const StatCard = ({ label, value, unit = "", color = "primary" }: any) => (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="text-muted-foreground text-sm font-medium mb-2">
        {label}
      </div>
      <div className={`text-3xl md:text-4xl font-bold text-${color}`}>
        {value}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </div>
    </Card>
  );

  return (
    <div className="space-y-4 sticky top-8">
      <div className="text-lg font-semibold text-foreground mb-4">
        Statistics
      </div>

      <StatCard
        label="Words Per Minute"
        value={stats.wpm}
        unit="WPM"
        color="primary"
      />

      <StatCard
        label="Accuracy"
        value={stats.accuracy}
        unit="%"
        color="accent"
      />

      <StatCard
        label="Time Elapsed"
        value={formatTime(stats.timeElapsed)}
        color="secondary"
      />

      <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">
              Characters Typed
            </span>
            <span className="font-semibold text-foreground">
              {stats.charactersTyped}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">
              Correct Characters
            </span>
            <span className="font-semibold text-green-400">
              {stats.correctCharacters}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Errors</span>
            <span className="font-semibold text-red-400">
              {stats.charactersTyped - stats.correctCharacters}
            </span>
          </div>
        </div>
      </Card>

      {/* Status Indicator */}
      <Card className="p-4 bg-linear-to-r from-primary/20 to-accent/20 border border-primary/30">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              stats.isActive
                ? "bg-green-400 animate-pulse"
                : "bg-muted-foreground"
            }`}
          />
          <span className="text-sm font-medium text-foreground">
            {stats.isActive ? "Typing..." : "Ready to type"}
          </span>
        </div>
      </Card>
    </div>
  );
}

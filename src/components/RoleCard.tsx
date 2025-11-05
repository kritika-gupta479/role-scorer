import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Award } from "lucide-react";

interface RoleCardProps {
  role: string;
  matchedSkills: string[];
  educationMatch: boolean;
  matchScore: number;
  totalPossible: number;
}

export const RoleCard = ({
  role,
  matchedSkills,
  educationMatch,
  matchScore,
  totalPossible,
}: RoleCardProps) => {
  const matchPercentage = Math.round((matchScore / totalPossible) * 100);

  return (
    <Card className="p-6 bg-card hover:shadow-[var(--shadow-hover)] transition-all duration-300 border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">{role}</h3>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-2xl font-bold text-primary">
              {matchPercentage}%
            </span>
            <span className="text-sm text-muted-foreground">Match</span>
          </div>
        </div>
      </div>

      {educationMatch && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-accent/10 rounded-lg border border-accent/20">
          <CheckCircle2 className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">
            Education Requirement Met
          </span>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Matched Skills:</p>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Score: {matchScore} / {totalPossible} points
        </div>
      </div>
    </Card>
  );
};

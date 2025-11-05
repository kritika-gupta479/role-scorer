import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SkillSelector } from "@/components/SkillSelector";
import { RoleCard } from "@/components/RoleCard";
import rolesData from "@/data/roles.json";
import { Search, Sparkles, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface Role {
  id: string;
  role: string;
  skills: string[];
  education: string[];
}

interface MatchedRole extends Role {
  matchScore: number;
  matchedSkills: string[];
  educationMatch: boolean;
  totalPossible: number;
}

const educationOptions = [
  "B.Tech CS",
  "B.Tech IT",
  "B.Sc CS",
  "BCA",
  "MCA",
  "M.Sc CS",
  "M.Tech CS",
  "B.Des",
  "BFA",
  "BBA",
  "MBA",
  "B.Com",
  "BA",
  "MA",
  "Diploma",
];

const Index = () => {
  const [education, setEducation] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>("");
  const [recommendations, setRecommendations] = useState<MatchedRole[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const calculateMatches = () => {
    if (!education || selectedSkills.length === 0) {
      toast.error("Please select your education and at least one skill");
      return;
    }

    const roles = rolesData as Role[];
    const matchedRoles: MatchedRole[] = roles.map((role) => {
      let score = 0;
      const matchedSkills: string[] = [];

      // Check skill matches
      role.skills.forEach((skill) => {
        if (selectedSkills.includes(skill)) {
          score += 1;
          matchedSkills.push(skill);
        }
      });

      // Check education match
      const educationMatch = role.education.includes(education);
      if (educationMatch) {
        score += 1;
      }

      // Total possible points (all skills + education)
      const totalPossible = role.skills.length + 1;

      return {
        ...role,
        matchScore: score,
        matchedSkills,
        educationMatch,
        totalPossible,
      };
    });

    // Filter roles with at least one match and sort by score
    const filteredRoles = matchedRoles
      .filter((role) => role.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setRecommendations(filteredRoles);
    setShowResults(true);

    if (filteredRoles.length === 0) {
      toast.error("No matching roles found. Try selecting more skills.");
    } else {
      toast.success(`Found ${filteredRoles.length} matching roles!`);
    }
  };

  const resetForm = () => {
    setEducation("");
    setSelectedSkills([]);
    setExperience("");
    setRecommendations([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <GraduationCap className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Internship & Placement Recommender
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Find your perfect role match based on your education, skills, and experience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!showResults ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-[var(--shadow-soft)] p-8 border border-border">
              <div className="space-y-8">
                {/* Education Section */}
                <div className="space-y-3">
                  <Label htmlFor="education" className="text-base font-semibold">
                    Education Qualification *
                  </Label>
                  <Select value={education} onValueChange={setEducation}>
                    <SelectTrigger id="education" className="h-12">
                      <SelectValue placeholder="Select your education qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills Section */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Select Your Skills *
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose all skills that apply to you
                  </p>
                  <SkillSelector
                    selectedSkills={selectedSkills}
                    onSkillToggle={handleSkillToggle}
                  />
                  {selectedSkills.length > 0 && (
                    <p className="text-sm text-primary font-medium mt-4">
                      {selectedSkills.length} skill{selectedSkills.length !== 1 ? "s" : ""} selected
                    </p>
                  )}
                </div>

                {/* Experience Section */}
                <div className="space-y-3">
                  <Label htmlFor="experience" className="text-base font-semibold">
                    Experience / Projects (Optional)
                  </Label>
                  <Textarea
                    id="experience"
                    placeholder="Briefly describe your experience, internships, or projects..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  onClick={calculateMatches}
                  size="lg"
                  className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Get Recommendations
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Your Top Matches
              </h2>
              <p className="text-muted-foreground">
                Based on your profile, here are the {recommendations.length} best roles for you
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid gap-6 max-w-5xl mx-auto">
              {recommendations.map((role) => (
                <RoleCard
                  key={role.id}
                  role={role.role}
                  matchedSkills={role.matchedSkills}
                  educationMatch={role.educationMatch}
                  matchScore={role.matchScore}
                  totalPossible={role.totalPossible}
                />
              ))}
            </div>

            {/* Try Again Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={resetForm}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Try Again with Different Inputs
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

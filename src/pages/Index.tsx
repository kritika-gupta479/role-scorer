import { useState, useEffect } from "react";
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
import { Search, Sparkles, GraduationCap, Download, Loader2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { generatePDF } from "@/utils/pdfExport";
import { parseCSV, InternshipData } from "@/utils/csvParser";
import { Link } from "react-router-dom";

interface Role extends InternshipData {}

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
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  // Load and parse CSV data
  useEffect(() => {
    const loadInternships = async () => {
      try {
        const response = await fetch('/src/data/internships.csv');
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setRoles(parsedData);
        toast.success(`Loaded ${parsedData.length} internship opportunities!`);
      } catch (error) {
        console.error("Error loading internships:", error);
        toast.error("Error loading internship data");
      } finally {
        setLoading(false);
      }
    };
    loadInternships();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading internship opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground py-20 px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-sm hover-glow hover-scale">
              <GraduationCap className="w-16 h-16 animate-float" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Internship & Placement Recommender
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Discover your perfect role match with AI-powered recommendations
          </p>
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/docs">
              <Button variant="outline" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20 gap-2">
                <BookOpen className="w-4 h-4" />
                View Project Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {!showResults ? (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-card rounded-2xl shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-elevation)] p-8 border border-border transition-all duration-500">
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
                  className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 hover-lift group overflow-hidden relative"
                >
                  <span className="absolute inset-0 bg-[var(--gradient-shimmer)] animate-shimmer" />
                  <Search className="w-5 h-5 mr-2 relative z-10 transition-transform group-hover:scale-110" />
                  <span className="relative z-10">Get Recommendations</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl hover-glow animate-scale-in">
                  <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in-up">
                Your Top Matches
              </h2>
              <p className="text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Based on your profile, here are the {recommendations.length} best roles for you
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid gap-6 max-w-5xl mx-auto">
              {recommendations.map((role, index) => (
                <div
                  key={role.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RoleCard
                    role={role.jobTitle}
                    matchedSkills={role.matchedSkills}
                    educationMatch={role.educationMatch}
                    matchScore={role.matchScore}
                    totalPossible={role.totalPossible}
                    companyName={role.companyName}
                    city={role.city}
                    state={role.state}
                    stipend={role.stipend}
                    duration={role.duration}
                    numberOfOpenings={role.numberOfOpenings}
                    lastDateToApply={role.lastDateToApply}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button
                onClick={() => generatePDF(recommendations, education, selectedSkills)}
                size="lg"
                className="bg-primary hover:bg-primary/90 hover-lift group"
              >
                <Download className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Download PDF Report
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-lift"
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

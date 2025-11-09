import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript", "Kotlin", "Swift"],
  },
  {
    category: "Web Technologies",
    skills: ["HTML", "CSS", "React", "Node.js", "Angular", "API Development"],
  },
  {
    category: "Data & Analytics",
    skills: ["Excel", "SQL", "Data Analysis", "Statistics", "Power BI"],
  },
  {
    category: "Design & Creative",
    skills: ["Figma", "Photoshop", "Illustrator", "UI/UX", "Design"],
  },
  {
    category: "Specialized",
    skills: [
      "Machine Learning",
      "TensorFlow",
      "Deep Learning",
      "Mobile Development",
      "Android",
      "iOS",
      "React Native",
      "Cloud Computing",
      "AWS",
      "Azure",
      "Docker",
      "Linux",
      "DevOps",
      "CI/CD",
      "Testing",
      "Selenium",
      "Security",
      "Networking",
      "Ethical Hacking",
    ],
  },
  {
    category: "Business & Communication",
    skills: [
      "Communication",
      "Content Writing",
      "SEO",
      "Social Media",
      "Analytics",
      "HR Management",
      "Recruitment",
      "Research",
    ],
  },
];

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
}

export const SkillSelector = ({
  selectedSkills,
  onSkillToggle,
}: SkillSelectorProps) => {
  return (
    <div className="space-y-6">
      {skillCategories.map((category, categoryIndex) => (
        <div 
          key={category.category} 
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: `${categoryIndex * 0.1}s` }}
        >
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            {category.category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {category.skills.map((skill, index) => (
              <div 
                key={skill} 
                className="flex items-center space-x-2 group animate-scale-in"
                style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.02)}s` }}
              >
                <Checkbox
                  id={skill}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => onSkillToggle(skill)}
                  className="border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-300 group-hover:border-primary/50"
                />
                <Label
                  htmlFor={skill}
                  className="text-sm font-normal cursor-pointer text-foreground hover:text-primary transition-all duration-300 group-hover:translate-x-0.5"
                >
                  {skill}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

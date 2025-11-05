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
      {skillCategories.map((category) => (
        <div key={category.category} className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">
            {category.category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {category.skills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={() => onSkillToggle(skill)}
                  className="border-input data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={skill}
                  className="text-sm font-normal cursor-pointer text-foreground hover:text-primary transition-colors"
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

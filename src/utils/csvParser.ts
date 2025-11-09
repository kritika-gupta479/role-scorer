export interface InternshipData {
  id: string;
  jobTitle: string;
  jobType: string;
  companyName: string;
  postedDate: string;
  city: string;
  state: string;
  stipend: string;
  startDate: string;
  duration: string;
  numberOfOpenings: string;
  lastDateToApply: string;
  skills: string[];
  education: string[];
  description: string;
  applicationTips: string;
}

// Skill inference from job titles
const skillKeywords: { [key: string]: string[] } = {
  "IT": ["HTML", "CSS", "JavaScript", "Programming"],
  "E-GOVERNANCE": ["Technology", "Database Management", "Web Development"],
  "FINANCE": ["Excel", "Accounting", "Financial Analysis", "SQL"],
  "WATER": ["Civil Engineering", "Environmental Science", "Project Management"],
  "CIVIL": ["AutoCAD", "Civil Engineering", "Project Planning", "Construction Management"],
  "URBAN PLANNING": ["GIS", "Urban Design", "AutoCAD", "Planning Software"],
  "SOCIAL": ["Communication", "Community Development", "Social Work", "Research"],
  "MARKETING": ["Digital Marketing", "Social Media", "Content Writing", "SEO"],
  "MOBILE": ["Android", "iOS", "React Native", "Mobile Development"],
  "WEBSITE": ["HTML", "CSS", "JavaScript", "React", "Web Development"],
  "DATA": ["Python", "Data Analysis", "Excel", "SQL", "Statistics"],
  "DESIGN": ["Figma", "Adobe XD", "UI/UX", "Graphic Design"],
  "ENVIRONMENTAL": ["Environmental Science", "Sustainability", "Research"],
  "CAPACITY BUILDING": ["Training", "Communication", "Organizational Development"],
  "ANDROID": ["Java", "Kotlin", "Android SDK", "Mobile Development"],
  "E-COMMERCE": ["Web Development", "Digital Marketing", "Business Analysis"],
};

const educationByRole: { [key: string]: string[] } = {
  "IT": ["B.Tech CS", "B.Tech IT", "BCA", "MCA"],
  "ENGINEERING": ["B.Tech", "B.E.", "Diploma Engineering"],
  "FINANCE": ["B.Com", "BBA", "MBA", "CA"],
  "CIVIL": ["B.Tech Civil", "Diploma Civil Engineering", "B.E. Civil"],
  "SOCIAL": ["BA", "MA", "MSW", "B.Sc"],
  "DESIGN": ["B.Des", "BFA", "Diploma Design"],
  "MANAGEMENT": ["BBA", "MBA", "B.Com"],
  "DEFAULT": ["Any Degree", "Graduate", "Undergraduate"],
};

function inferSkills(jobTitle: string): string[] {
  const title = jobTitle.toUpperCase();
  const skills: Set<string> = new Set();

  Object.entries(skillKeywords).forEach(([keyword, skillList]) => {
    if (title.includes(keyword)) {
      skillList.forEach(skill => skills.add(skill));
    }
  });

  return skills.size > 0 ? Array.from(skills) : ["General Skills", "Communication", "Teamwork"];
}

function inferEducation(jobTitle: string): string[] {
  const title = jobTitle.toUpperCase();
  
  for (const [keyword, eduList] of Object.entries(educationByRole)) {
    if (title.includes(keyword)) {
      return eduList;
    }
  }
  
  return educationByRole.DEFAULT;
}

function generateDescription(data: Partial<InternshipData>): string {
  return `Join ${data.companyName} as a ${data.jobTitle} in ${data.city}, ${data.state}. This ${data.jobType?.toLowerCase()} position offers practical experience in a professional environment. Duration: ${data.duration}. Stipend: ${data.stipend}. Start immediately and gain valuable industry experience.`;
}

function generateApplicationTips(jobTitle: string): string {
  const title = jobTitle.toUpperCase();
  
  if (title.includes("IT") || title.includes("SOFTWARE") || title.includes("DEVELOPER")) {
    return "Highlight your technical projects and GitHub repositories. Include any certifications in relevant technologies. Demonstrate problem-solving abilities through code samples.";
  } else if (title.includes("FINANCE") || title.includes("ACCOUNTING")) {
    return "Showcase Excel proficiency and financial modeling skills. Include any coursework in accounting or finance. Demonstrate attention to detail and analytical thinking.";
  } else if (title.includes("CIVIL") || title.includes("ENGINEER")) {
    return "Present CAD drawings and project work. Include site visit experience if any. Highlight understanding of construction codes and safety standards.";
  } else if (title.includes("SOCIAL") || title.includes("COMMUNITY")) {
    return "Demonstrate communication skills and community engagement experience. Include any volunteer work or social projects. Show cultural sensitivity and empathy.";
  } else if (title.includes("MARKETING") || title.includes("MEDIA")) {
    return "Build a portfolio of content samples and campaign examples. Show metrics from previous social media work. Demonstrate creativity and strategic thinking.";
  }
  
  return "Tailor your resume to highlight relevant coursework and projects. Demonstrate enthusiasm for learning. Include any internship or volunteer experience. Show strong communication and teamwork skills.";
}

export function parseCSV(csvText: string): InternshipData[] {
  const lines = csvText.trim().split('\n');
  const internships: InternshipData[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // Parse CSV considering quoted fields
    const fields: string[] = [];
    let currentField = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    fields.push(currentField.trim());
    
    if (fields.length >= 11) {
      const jobTitle = fields[1] || "Internship Position";
      const skills = inferSkills(jobTitle);
      const education = inferEducation(jobTitle);
      
      const internshipData: Partial<InternshipData> = {
        id: fields[0] || String(i),
        jobTitle,
        jobType: fields[2],
        companyName: fields[3],
        postedDate: fields[4],
        city: fields[5],
        state: fields[6],
        stipend: fields[7],
        startDate: fields[8],
        duration: fields[9],
        numberOfOpenings: fields[10],
        lastDateToApply: fields[11],
        skills,
        education,
      };
      
      internships.push({
        ...internshipData,
        description: generateDescription(internshipData),
        applicationTips: generateApplicationTips(jobTitle),
      } as InternshipData);
    }
  }
  
  return internships;
}

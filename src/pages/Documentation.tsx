import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

const Documentation = () => {
  const navigate = useNavigate();

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      const lines = doc.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += fontSize * 0.5;
      });
      yPosition += 3;
    };

    // Title
    addText("Internship & Placement Recommender System", 18, true);
    addText("Complete Project Documentation", 12);
    yPosition += 5;

    // Overview
    addText("Project Overview", 14, true);
    addText("This is an AI-powered web application that helps students find the best internship opportunities based on their education, skills, and experience. It analyzes a real dataset of 2,238 AICTE internships and provides personalized recommendations with match scores.");
    yPosition += 5;

    // Key Features
    addText("Key Features", 14, true);
    
    addText("1. Smart Matching Algorithm", 12, true);
    addText("- Compares user's education level with internship requirements");
    addText("- Matches selected skills against job requirements");
    addText("- Calculates compatibility scores for each opportunity");
    addText("- Returns top 5 best-matched internships");
    yPosition += 3;

    addText("2. User Input System", 12, true);
    addText("- Education Selection: Dropdown with options (10th, 12th, Diploma, UG, PG)");
    addText("- Skill Selector: Categorized skills across multiple domains (Programming, Web Development, Data Science, Design, Business, Cloud & DevOps)");
    addText("- Experience Input: Textarea for relevant experience/projects");
    yPosition += 3;

    addText("3. Recommendation Display", 12, true);
    addText("- Shows match percentage for each internship");
    addText("- Displays company name, location, stipend");
    addText("- Lists matched skills with visual badges");
    addText("- Shows education compatibility");
    addText("- Includes internship duration and application deadlines");
    addText("- Provides tailored application tips");
    yPosition += 3;

    addText("4. PDF Export", 12, true);
    addText("- Generates professional PDF report");
    addText("- Includes user profile summary");
    addText("- Lists all recommendations with full details");
    addText("- Downloads with timestamp");
    yPosition += 5;

    // User Flow
    addText("User Flow", 14, true);
    addText("1. Landing Page: Hero section with animated tagline");
    addText("2. Input Form: User enters education, selects skills, adds experience");
    addText("3. Processing: System analyzes 2,238 internships against user profile");
    addText("4. Results Page: Displays top 5 matches with detailed cards");
    addText("5. Actions: Download PDF report or start new search");
    yPosition += 5;

    // Technical Architecture
    addText("Technical Architecture", 14, true);
    
    addText("Frontend Components:", 12, true);
    addText("- Index.tsx (Main Page): Manages all application state, loads CSV data, handles matching algorithm");
    addText("- RoleCard.tsx: Displays individual internship details with match score");
    addText("- SkillSelector.tsx: Organized skill categories with checkboxes");
    yPosition += 3;

    addText("Data Processing:", 12, true);
    addText("- internships.csv: Real AICTE dataset with 2,238 internships");
    addText("- csvParser.ts: Parses CSV, infers skills and education, generates descriptions");
    addText("- pdfExport.ts: Uses jsPDF library to format recommendations into PDF");
    yPosition += 3;

    addText("Styling System:", 12, true);
    addText("- index.css: Design tokens, CSS variables, custom utility classes, dark mode support");
    addText("- tailwind.config.ts: Animation keyframes and custom Tailwind extensions");
    yPosition += 5;

    // Design Features
    addText("Design Features", 14, true);
    addText("- Color Scheme: Monochromatic palette (Black, Grey, White) with dark mode");
    addText("- Animations: Floating hero, fade-in-up forms, hover lift cards, scale-in skills");
    addText("- Typography: Clean sans-serif with proper hierarchy and accessibility");
    yPosition += 5;

    // Technologies
    addText("Technologies Used", 14, true);
    addText("React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, jsPDF, Lucide React, Sonner");
    yPosition += 5;

    // Matching Algorithm
    addText("How Matching Works", 14, true);
    addText("1. Load Data: Parse CSV into structured objects");
    addText("2. Education Match: Check if user's education meets requirements");
    addText("3. Skill Match: Count overlapping skills between user and job");
    addText("4. Score Calculation: matchScore = educationMatch + skillMatches");
    addText("5. Sort & Filter: Return top 5 highest scoring opportunities");
    addText("6. Display: Show results with percentage based on total possible score");
    yPosition += 5;

    // UX Highlights
    addText("User Experience Highlights", 14, true);
    addText("- Loading States: Skeleton loaders while data loads");
    addText("- Error Handling: Toast notifications for issues");
    addText("- Responsive Design: Works on mobile, tablet, desktop");
    addText("- Smooth Transitions: All interactions animated");
    addText("- Clear CTAs: Prominent action buttons");
    addText("- Professional Output: Well-formatted PDF reports");

    doc.save(`Internship-Recommender-Documentation-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to App
          </Button>
          <Button onClick={downloadPDF} className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Internship & Placement Recommender System</h1>
          <p className="text-xl text-muted-foreground mb-8">Complete Project Documentation</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">📋 Project Overview</h2>
            <p>
              This is an AI-powered web application that helps students find the best internship opportunities 
              based on their education, skills, and experience. It analyzes a real dataset of 2,238 AICTE 
              internships and provides personalized recommendations with match scores.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🎯 Key Features</h2>
            
            <h3 className="text-xl font-semibold mb-2">1. Smart Matching Algorithm</h3>
            <ul>
              <li>Compares user's education level with internship requirements</li>
              <li>Matches selected skills against job requirements</li>
              <li>Calculates compatibility scores for each opportunity</li>
              <li>Returns top 5 best-matched internships</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">2. User Input System</h3>
            <ul>
              <li><strong>Education Selection:</strong> Dropdown with options (10th, 12th, Diploma, UG, PG)</li>
              <li><strong>Skill Selector:</strong> Categorized skills across multiple domains (Programming, Web Development, Data Science, Design, Business, Cloud & DevOps)</li>
              <li><strong>Experience Input:</strong> Textarea for relevant experience/projects</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">3. Recommendation Display</h3>
            <ul>
              <li>Shows match percentage for each internship</li>
              <li>Displays company name, location, stipend</li>
              <li>Lists matched skills with visual badges</li>
              <li>Shows education compatibility</li>
              <li>Includes internship duration and application deadlines</li>
              <li>Provides tailored application tips</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">4. PDF Export</h3>
            <ul>
              <li>Generates professional PDF report</li>
              <li>Includes user profile summary</li>
              <li>Lists all recommendations with full details</li>
              <li>Downloads with timestamp</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🔄 User Flow</h2>
            <ol>
              <li><strong>Landing Page:</strong> Hero section with animated tagline</li>
              <li><strong>Input Form:</strong> User enters education, selects skills, adds experience</li>
              <li><strong>Processing:</strong> System analyzes 2,238 internships against user profile</li>
              <li><strong>Results Page:</strong> Displays top 5 matches with detailed cards</li>
              <li><strong>Actions:</strong> Download PDF report or start new search</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🏗️ Technical Architecture</h2>
            
            <h3 className="text-xl font-semibold mb-2">Frontend Components</h3>
            <ul>
              <li><strong>Index.tsx:</strong> Main page managing all application state, CSV loading, matching algorithm</li>
              <li><strong>RoleCard.tsx:</strong> Displays individual internship details with match score and animations</li>
              <li><strong>SkillSelector.tsx:</strong> Organized skill categories with multi-select checkboxes</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">Data Processing</h3>
            <ul>
              <li><strong>internships.csv:</strong> Real AICTE dataset with 2,238 internships</li>
              <li><strong>csvParser.ts:</strong> Parses CSV, infers skills and education from job titles, generates descriptions</li>
              <li><strong>pdfExport.ts:</strong> Uses jsPDF library to format recommendations into PDF</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2 mt-4">Styling System</h3>
            <ul>
              <li><strong>index.css:</strong> Design tokens, CSS variables for shadows/transitions/gradients, custom utility classes</li>
              <li><strong>tailwind.config.ts:</strong> Animation keyframes (fade-in, scale-in, slide-in, shimmer, float)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🎨 Design Features</h2>
            
            <h3 className="text-xl font-semibold mb-2">Color Scheme</h3>
            <p>Monochromatic palette: Black (#0a0a0a), Grey (#f5f5f5), White with full dark mode support</p>

            <h3 className="text-xl font-semibold mb-2 mt-4">Animations</h3>
            <ul>
              <li><strong>Hero Section:</strong> Floating animation, shimmer effects</li>
              <li><strong>Form Elements:</strong> Fade-in-up with stagger delays</li>
              <li><strong>Cards:</strong> Hover lift with glow shadows</li>
              <li><strong>Skills:</strong> Scale-in on load, hover scale effects</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🛠️ Technologies Used</h2>
            <p>
              React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, jsPDF, Lucide React, Sonner
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">🔍 How Matching Works</h2>
            <ol>
              <li><strong>Load Data:</strong> Parse CSV into structured objects</li>
              <li><strong>Education Match:</strong> Check if user's education meets requirements</li>
              <li><strong>Skill Match:</strong> Count overlapping skills between user and job</li>
              <li><strong>Score Calculation:</strong> matchScore = educationMatch + skillMatches</li>
              <li><strong>Sort & Filter:</strong> Return top 5 highest scoring opportunities</li>
              <li><strong>Display:</strong> Show results with percentage based on total possible score</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">✨ User Experience Highlights</h2>
            <ul>
              <li><strong>Loading States:</strong> Skeleton loaders while data loads</li>
              <li><strong>Error Handling:</strong> Toast notifications for issues</li>
              <li><strong>Responsive Design:</strong> Works on mobile, tablet, desktop</li>
              <li><strong>Smooth Transitions:</strong> All interactions animated</li>
              <li><strong>Clear CTAs:</strong> Prominent action buttons</li>
              <li><strong>Professional Output:</strong> Well-formatted PDF reports</li>
            </ul>
          </section>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <p className="text-center font-semibold">
              This is a complete, production-ready internship recommendation system with real data, 
              smart matching, beautiful UI, and smooth animations! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;

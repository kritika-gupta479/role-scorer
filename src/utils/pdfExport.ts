import { jsPDF } from "jspdf";

interface Role {
  jobTitle: string;
  matchedSkills: string[];
  educationMatch: boolean;
  matchScore: number;
  totalPossible: number;
  description?: string;
  applicationTips?: string;
  companyName?: string;
  city?: string;
  state?: string;
  stipend?: string;
  duration?: string;
  numberOfOpenings?: string;
  lastDateToApply?: string;
}

export const generatePDF = (
  recommendations: Role[],
  education: string,
  selectedSkills: string[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Header
  doc.setFillColor(59, 130, 246); // Primary blue
  doc.rect(0, 0, pageWidth, 45, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Internship & Placement", pageWidth / 2, 20, { align: "center" });
  doc.text("Role Recommendations", pageWidth / 2, 32, { align: "center" });

  yPosition = 55;

  // Profile Summary
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Your Profile", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Education: ${education}`, margin, yPosition);
  yPosition += 6;
  
  const skillsText = `Skills: ${selectedSkills.join(", ")}`;
  const skillsLines = doc.splitTextToSize(skillsText, contentWidth);
  doc.text(skillsLines, margin, yPosition);
  yPosition += skillsLines.length * 5 + 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Recommendations
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Top ${recommendations.length} Matching Roles`, margin, yPosition);
  yPosition += 10;

  recommendations.forEach((role, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }

    // Role header with match percentage
    const matchPercentage = Math.round((role.matchScore / role.totalPossible) * 100);
    doc.setFillColor(240, 249, 255);
    doc.rect(margin, yPosition, contentWidth, 12, "F");
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 64, 175);
    doc.text(`${index + 1}. ${role.jobTitle}`, margin + 3, yPosition + 8);
    
    doc.setFontSize(10);
    doc.setTextColor(34, 197, 94);
    doc.text(`${matchPercentage}% Match`, pageWidth - margin - 3, yPosition + 8, { align: "right" });
    
    yPosition += 15;

    // Company and Location info
    if (role.companyName) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Company:", margin + 3, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(role.companyName, margin + 23, yPosition);
      yPosition += 5;
    }
    
    if (role.city && role.state) {
      doc.setFont("helvetica", "bold");
      doc.text("Location:", margin + 3, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(`${role.city}, ${role.state}`, margin + 23, yPosition);
      yPosition += 5;
    }

    // Internship details
    if (role.stipend || role.duration || role.numberOfOpenings) {
      let detailsLine = "";
      if (role.stipend) detailsLine += `Stipend: ${role.stipend}  `;
      if (role.duration) detailsLine += `Duration: ${role.duration}  `;
      if (role.numberOfOpenings) detailsLine += `Openings: ${role.numberOfOpenings}`;
      doc.text(detailsLine, margin + 3, yPosition);
      yPosition += 5;
    }

    if (role.lastDateToApply) {
      doc.setFont("helvetica", "italic");
      doc.setTextColor(220, 38, 38);
      doc.text(`Apply by: ${role.lastDateToApply}`, margin + 3, yPosition);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      yPosition += 7;
    }
    
    yPosition += 2;

    // Matched Skills
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Matched Skills:", margin + 3, yPosition);
    yPosition += 5;
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(34, 197, 94);
    const skillsText = role.matchedSkills.join(", ");
    const skillLines = doc.splitTextToSize(skillsText, contentWidth - 6);
    doc.text(skillLines, margin + 3, yPosition);
    yPosition += skillLines.length * 4 + 3;

    // Education Match
    if (role.educationMatch) {
      doc.setTextColor(34, 197, 94);
      doc.text("✓ Education requirement met", margin + 3, yPosition);
      yPosition += 6;
    }

    // Description
    if (role.description) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Role Description:", margin + 3, yPosition);
      yPosition += 5;
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const descLines = doc.splitTextToSize(role.description, contentWidth - 6);
      doc.text(descLines, margin + 3, yPosition);
      yPosition += descLines.length * 4 + 5;
    }

    // Application Tips
    if (role.applicationTips) {
      // Check if we need a new page for tips
      if (yPosition > pageHeight - 50) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("Application Tips:", margin + 3, yPosition);
      yPosition += 5;
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      const tipsLines = doc.splitTextToSize(role.applicationTips, contentWidth - 6);
      doc.text(tipsLines, margin + 3, yPosition);
      yPosition += tipsLines.length * 4 + 8;
    }

    // Divider between roles
    if (index < recommendations.length - 1) {
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 8;
    }
  });

  // Footer on last page
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Generated on ${currentDate}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  // Save the PDF
  doc.save(`role-recommendations-${new Date().getTime()}.pdf`);
};

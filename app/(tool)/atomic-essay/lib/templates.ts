export interface EssayTemplate {
  name: string;
  description: string;
  content: string;
}

export const essayTemplates: EssayTemplate[] = [
  {
    name: "Basic Essay",
    description: "A simple structure for your atomic essay",
    content:
      "# Main Point\n\nIntroduce your key idea here...\n\n## Supporting Points\n\n1. First point\n2. Second point\n3. Third point\n\n## Key Takeaway\n\nWhat should readers remember?",
  },
  {
    name: "Problem-Solution",
    description: "Frame a problem and present your solution",
    content:
      "# The Problem\n\nDescribe the challenge here...\n\n## Solution\n\nPresent your unique insight...\n\n## Why It Works\n\n- Point 1\n- Point 2\n- Point 3",
  },
];

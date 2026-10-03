export interface SocialConfig {
  name: string;
  preferredName: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  phone: string; // Displayed intentionally only in the Contact section
  github: string;
  linkedin: string;
  instagram: string;
  resumeUrl: string;
  education: {
    institution: string;
    degree: string;
    specialization: string;
    timeline: string;
    grade?: string;
  }[];
}

export const socialConfig: SocialConfig = {
  name: "Vangala Sreeram Yashwanth",
  preferredName: "Silver Quill",
  shortName: "Quill",
  role: "Computer Science & Data Science Engineer × AI Systems Researcher",
  location: "Chennai, India",
  email: "vsryashwanth.007@gmail.com",
  phone: "+91 8978906474",
  github: "https://github.com/vsr-yashwanth",
  linkedin: "https://www.linkedin.com/in/vsr-yashwanth-81853631a/",
  instagram: "https://www.instagram.com/vsryashwanth/",
  resumeUrl: "/resume.pdf",
  education: [
    {
      institution: "SRM Institute of Science and Technology, Chennai",
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science & Engineering (Data Science)",
      timeline: "2025 – 2029",
      grade: "9.05 / 10 CGPA",
    },
    {
      institution: "Indian Institute of Technology, Madras (IIT Madras)",
      degree: "Bachelor of Science (BS)",
      specialization: "Data Science & Applications",
      timeline: "2025 – 2029",
    },
  ],
};

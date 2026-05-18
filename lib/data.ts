export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatar?: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "peter-zhuang",
    name: "Peter Zhuang",
    role: "Chairman",
    bio: "Leads the Queensland Chinese Affairs Committee in representing the Chinese community and fostering dialogue with federal, state, and local government.",
    initials: "PZ",
    avatar: "/images/team/peter-zhuang.jpg",
  },
  {
    slug: "ava-lin",
    name: "Ava Lin",
    role: "Programs Lead",
    bio: "Designs events and youth initiatives that connect heritage with modern community life.",
    initials: "AL",
  },
  {
    slug: "ming-zhao",
    name: "Ming Zhao",
    role: "Volunteer Coordinator",
    bio: "Builds inclusive volunteer experiences and strengthens member participation.",
    initials: "MZ",
  },
  {
    slug: "noah-wu",
    name: "Noah Wu",
    role: "Communications Manager",
    bio: "Shapes storytelling, bilingual outreach, and media presence for the organization.",
    initials: "NW",
  },
];

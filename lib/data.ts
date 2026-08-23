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
    bio: "Chairman of the Queensland Chinese Affairs Committee.\nRepresents the Chinese community in dialogue with federal, state, and local government.",
    initials: "PZ",
    avatar: "/images/team/peter-zhuang.jpg",
  },
  {
    slug: "alan-chen",
    name: "Chen Yimin",
    role: "Vice Chair",
    bio: "President of Universal Education & Multicultural Exchange Association Inc. (UEMEA).\nOriginally from China, Alan Chen came to Australia in 1990 and has actively supported local multicultural community events, promoting a vibrant, harmonious, and diverse society.",
    initials: "AC",
    avatar: "/images/team/alan-chen.jpg",
  },
  {
    slug: "chen-fan",
    name: "Chen Fan",
    role: "Vice Chair",
    bio: "President of Mainland Chinese Society Queensland.\nRecipient of the Centenary Medal of Federation of Australia and the 2001 International Year of Volunteers award. He has long supported Chinese arts, cultural exchange, and multicultural community development in Queensland.",
    initials: "CF",
    avatar: "/images/team/chen-fan.jpg",
  },
  {
    slug: "chai-hoe",
    name: "He Ying",
    role: "Vice Chair",
    bio: "Australian lawyer.\nAn ANU law honours graduate with more than 12 years of legal practice experience, leading a professional legal team serving Australian and international clients. She founded the Australia-Asia Women's Association, served as the 28th President of the Brisbane Chinese Lions Club, and actively supports multicultural exchange, community service, and social inclusion.",
    initials: "CH",
    avatar: "/images/team/chai-hoe.jpg",
  },
  {
    slug: "ming-zhao",
    name: "Ming Zhao",
    role: "Volunteer Coordinator",
    bio: "Volunteer Coordinator.\nBuilds inclusive volunteer experiences and strengthens member participation.",
    initials: "MZ",
  },
  {
    slug: "noah-wu",
    name: "Noah Wu",
    role: "Communications Manager",
    bio: "Communications Manager.\nShapes storytelling, bilingual outreach, and media presence for the organization.",
    initials: "NW",
  },
];

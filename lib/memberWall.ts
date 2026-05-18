export type MemberWallItem = {
  name: string;
  description: string;
};

/** Group key: A–Z for Latin names, first character otherwise, # for digits/symbols. */
export function getMemberGroupKey(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "#";
  const first = trimmed[0];
  if (/[A-Za-z]/.test(first)) return first.toUpperCase();
  if (/[0-9]/.test(first)) return "#";
  return first;
}

/** Short label inside member chips (1–2 Latin letters or one CJK character). */
export function getMemberChipInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "·";
  if (/^[A-Za-z]/.test(trimmed)) {
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return trimmed.slice(0, 2).toUpperCase();
  }
  return trimmed[0];
}

export function groupMembersByInitial(
  items: MemberWallItem[],
): { key: string; items: MemberWallItem[] }[] {
  const map = new Map<string, MemberWallItem[]>();

  for (const item of items) {
    const key = getMemberGroupKey(item.name);
    const bucket = map.get(key) ?? [];
    bucket.push(item);
    map.set(key, bucket);
  }

  const latin = [...map.keys()].filter((k) => /^[A-Z]$/.test(k)).sort();
  const other = [...map.keys()]
    .filter((k) => !/^[A-Z]$/.test(k) && k !== "#")
    .sort((a, b) => a.localeCompare(b, "zh-CN"));
  const hash = map.has("#") ? ["#"] : [];

  return [...latin, ...other, ...hash].map((key) => ({
    key,
    items: map.get(key)!.sort((a, b) => a.name.localeCompare(b.name, "zh-CN")),
  }));
}

const CLUSTER_ACCENTS = [
  {
    ring: "from-navy/20 via-navy/8 to-transparent",
    badge: "bg-navy text-white shadow-glow",
    chip: "hover:border-navy/25 hover:bg-navy/[0.06]",
  },
  {
    ring: "from-crimson/20 via-crimson/8 to-transparent",
    badge: "bg-gradient-to-br from-crimson to-[#8B1A1A] text-white shadow-[0_12px_28px_rgba(178,34,34,0.28)]",
    chip: "hover:border-crimson/25 hover:bg-crimson/[0.05]",
  },
  {
    ring: "from-orange/25 via-orange/10 to-transparent",
    badge: "bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-navy shadow-[0_12px_28px_rgba(245,158,11,0.32)]",
    chip: "hover:border-orange/30 hover:bg-orange/[0.06]",
  },
] as const;

export function getClusterAccent(index: number) {
  return CLUSTER_ACCENTS[index % CLUSTER_ACCENTS.length];
}

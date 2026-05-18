"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  groupMembersByInitial,
  getMemberChipInitials,
  getClusterAccent,
  type MemberWallItem,
} from "@/lib/memberWall";

type Props = {
  items: MemberWallItem[];
  filterAllLabel: string;
  memberCountLabel: (count: number) => string;
  learnMoreLabel: string;
  onSelect: (item: MemberWallItem) => void;
};

export default function MemberWallCluster({
  items,
  filterAllLabel,
  memberCountLabel,
  learnMoreLabel,
  onSelect,
}: Props) {
  const clusters = useMemo(() => groupMembersByInitial(items), [items]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const visibleClusters = activeKey
    ? clusters.filter((c) => c.key === activeKey)
    : clusters;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveKey(null)}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition",
            activeKey === null
              ? "bg-navy text-white shadow-glow"
              : "glass-panel text-navy/72 hover:bg-white/80",
          )}
        >
          {filterAllLabel} · {items.length}
        </button>
        {clusters.map((cluster) => (
          <button
            key={cluster.key}
            type="button"
            onClick={() => setActiveKey(cluster.key === activeKey ? null : cluster.key)}
            className={cn(
              "min-w-[2.75rem] rounded-full px-3 py-2 text-sm font-medium transition",
              activeKey === cluster.key
                ? "bg-navy text-white shadow-glow"
                : "glass-panel text-navy/72 hover:bg-white/80",
            )}
          >
            {cluster.key}
            <span className="ml-1 text-xs opacity-70">{cluster.items.length}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {visibleClusters.map((cluster, clusterIndex) => {
          const accent = getClusterAccent(clusterIndex);

          return (
            <motion.article
              key={cluster.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: clusterIndex * 0.04 }}
              className="glass-panel card-sheen relative overflow-hidden rounded-[2rem] p-6 md:p-8"
            >
              <div
                className={cn(
                  "pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-gradient-to-br opacity-80 blur-2xl",
                  accent.ring,
                )}
                aria-hidden
              />

              <div className="relative flex flex-col gap-6 md:flex-row md:gap-8">
                <div className="flex shrink-0 items-start gap-4 md:w-36 md:flex-col md:items-center md:text-center">
                  <div
                    className={cn(
                      "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-serif text-3xl md:h-20 md:w-20 md:text-4xl",
                      accent.badge,
                    )}
                  >
                    {cluster.key}
                  </div>
                  <p className="text-xs uppercase tracking-[0.28em] text-navy/45">
                    {memberCountLabel(cluster.items.length)}
                  </p>
                </div>

                <div className="flex min-w-0 flex-1 flex-wrap content-start gap-2">
                  {cluster.items.map((item, itemIndex) => {
                    const hasDesc = Boolean(item.description);

                    return (
                      <motion.button
                        key={`${cluster.key}-${item.name}`}
                        type="button"
                        initial={{ opacity: 0, scale: 0.94 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.02 }}
                        onClick={() => hasDesc && onSelect(item)}
                        disabled={!hasDesc}
                        className={cn(
                          "group inline-flex max-w-full items-center gap-2.5 rounded-full border border-navy/10 bg-white/50 px-3 py-2 text-left transition",
                          accent.chip,
                          hasDesc ? "cursor-pointer" : "cursor-default",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            accent.badge,
                          )}
                        >
                          {getMemberChipInitials(item.name)}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-navy/88">{item.name}</span>
                          {hasDesc && (
                            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-crimson/70 opacity-0 transition group-hover:opacity-100">
                              {learnMoreLabel} →
                            </span>
                          )}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

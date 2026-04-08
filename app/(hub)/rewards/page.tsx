"use client";

import { Award, ChevronUp, Gift, Medal, Sparkles, TrendingUp, Trophy } from "lucide-react";
import { type ReactNode, useMemo } from "react";
import clsx from "clsx";
import { ActionLink, CardGrid, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { leaderboard } from "@/lib/mock-data";
import { getRewardsStore } from "@/lib/demo-store";

const weeklyTrend = [210, 250, 280, 320, 360, 410, 460];

const badgeMeta: Record<string, { icon: typeof Sparkles; tone: string; note: string }> = {
  "Campus Helper": {
    icon: Sparkles,
    tone: "from-brand-500/20 via-brand-50 to-white text-brand-700",
    note: "Earned through multi-service contribution."
  },
  "Study Buddy": {
    icon: Award,
    tone: "from-sky-500/20 via-sky-50 to-white text-sky-700",
    note: "Unlocked by collaboration and study support."
  },
  "Trusted Seller": {
    icon: Gift,
    tone: "from-gold-300/30 via-yellow-50 to-white text-amber-700",
    note: "Awarded for successful marketplace participation."
  }
};

function buildSparkline(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = 100;
  const height = 36;

  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = max === min ? height / 2 : height - ((value - min) / (max - min)) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return { points, width, height };
}

function buildBars(values: number[]) {
  const max = Math.max(...values, 1);
  return values.map((value) => Math.max(16, (value / max) * 100));
}

export default function RewardsPage() {
  const rewards = useMemo(() => getRewardsStore(), []);
  const sparkline = buildSparkline(weeklyTrend);
  const breakdownBars = buildBars(rewards.activity.map((entry: { label: string; points: number }) => entry.points));
  const nextRankGap = 40;
  const progressToNextRank = 1 - nextRankGap / 220;
  const ringRadius = 48;
  const circumference = 2 * Math.PI * ringRadius;
  const ringOffset = circumference * (1 - progressToNextRank);

  return (
    <div className="space-y-6">
      <PageIntro
        title="Rewards"
        description="Track points, badges, momentum, and leaderboard standing through a more visual rewards center powered by activity across the whole student hub."
        backHref="/dashboard"
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SoftCard className="overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(98,255,214,0.2),_transparent_26%),linear-gradient(135deg,rgba(4,62,81,0.98)_0%,rgba(9,86,76,0.96)_46%,rgba(0,133,64,0.92)_100%)] p-0 text-white shadow-[0_28px_60px_rgba(0,62,81,0.22)]">
          <div className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gold-100">
                Rewards Overview
              </span>
              <div>
                <p className="text-sm text-white/72">Total points</p>
                <p className="mt-2 text-5xl font-semibold tracking-tight">{rewards.totalPoints}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-300/15 px-3 py-1.5 text-sm font-semibold text-gold-100">
                  <TrendingUp className="h-4 w-4" />
                  +85 this week
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/88">
                  <Trophy className="h-4 w-4 text-[#7dffd1]" />
                  40 pts to reach Rank #11
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[200px_1fr] sm:items-center">
              <div className="mx-auto flex h-[170px] w-[170px] items-center justify-center rounded-full bg-white/8 ring-1 ring-white/15 backdrop-blur-sm">
                <div className="relative flex h-[138px] w-[138px] items-center justify-center">
                  <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle cx="60" cy="60" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="10" />
                    <circle
                      cx="60"
                      cy="60"
                      r={ringRadius}
                      fill="none"
                      stroke="url(#rankProgress)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={ringOffset}
                    />
                    <defs>
                      <linearGradient id="rankProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7dffd1" />
                        <stop offset="100%" stopColor="#dac961" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-white/60">Next Rank</p>
                    <p className="mt-1 text-[2rem] font-semibold leading-none">82%</p>
                    <p className="mt-1 text-[0.78rem] font-medium leading-none text-white/78">Rank #11</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/70">Current rank</p>
                      <p className="mt-2 text-3xl font-semibold">{rewards.rank}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#7dffd1]/15 px-3 py-1.5 text-xs font-semibold text-[#baf5d6]">
                      <ChevronUp className="h-3.5 w-3.5" />
                      climbing
                    </span>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-sm text-white/70">Seven-day momentum</p>
                  <svg viewBox={`0 0 ${sparkline.width} ${sparkline.height}`} className="mt-4 h-12 w-full">
                    <polyline fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" points={sparkline.points} />
                    <polyline fill="none" stroke="#7dffd1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points={sparkline.points} />
                  </svg>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">steady weekly growth</p>
                </div>
              </div>
            </div>
          </div>
        </SoftCard>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          <MetricCard
            label="Total Points"
            value={`${rewards.totalPoints}`}
            note="Strong contribution across the hub"
            accent="text-brand-700"
            icon={<Sparkles className="h-5 w-5" />}
            chart={<MiniSparkline values={weeklyTrend} />}
          />
          <MetricCard
            label="Current Rank"
            value={rewards.rank}
            note="Up 2 positions this week"
            accent="text-petrol-700"
            icon={<Trophy className="h-5 w-5" />}
            chip="+2"
          />
          <MetricCard
            label="Weekly Position"
            value="2nd"
            note="Just behind the weekly leader"
            accent="text-sky-700"
            icon={<TrendingUp className="h-5 w-5" />}
            chip="Top 3"
          />
          <MetricCard
            label="Earned Badges"
            value={`${rewards.badges.length}`}
            note="Unlocked through multi-service activity"
            accent="text-amber-700"
            icon={<Medal className="h-5 w-5" />}
            cluster={
              <div className="flex -space-x-2">
                {rewards.badges.map((badge: string, index: number) => (
                  <span
                    key={badge}
                    className={clsx(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-semibold shadow-sm",
                      index === 0 ? "bg-brand-100 text-brand-700" : index === 1 ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
                    )}
                  >
                    {badge.slice(0, 1)}
                  </span>
                ))}
              </div>
            }
          />
        </div>
      </div>

      <SoftCard>
        <SectionTitle title="Earned Badges" subtitle="Badges now feel like achievements, not just labels." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rewards.badges.map((badge: string) => {
            const meta = badgeMeta[badge] ?? badgeMeta["Campus Helper"];
            const Icon = meta.icon;

            return (
              <div
                key={badge}
                className={clsx(
                  "rounded-[24px] border border-white bg-gradient-to-br p-4 shadow-sm",
                  meta.tone
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Unlocked
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-950">{badge}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{meta.note}</p>
              </div>
            );
          })}
        </div>
      </SoftCard>

      <CardGrid cols="xl:grid-cols-[1.05fr_0.95fr]">
        <SoftCard>
          <SectionTitle title="Points Breakdown" subtitle="Visual contribution by activity across the connected services." />
          <div className="space-y-4">
            {rewards.activity.map((entry: { label: string; points: number }, index: number) => (
              <div key={entry.label} className="rounded-[24px] border border-slate-200/80 bg-white/90 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-slate-800">{entry.label}</span>
                  <span className="text-sm font-semibold text-brand-700">{entry.points} pts</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={clsx(
                      "h-full rounded-full bg-gradient-to-r",
                      index % 3 === 0
                        ? "from-brand-600 to-brand-400"
                        : index % 3 === 1
                          ? "from-sky-600 to-cyan-400"
                          : "from-amber-500 to-gold-300"
                    )}
                    style={{ width: `${breakdownBars[index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SoftCard>

        <SoftCard>
          <SectionTitle title="Leaderboard Snapshot" subtitle="A more visual look at who is ahead and how close you are." />
          <LeaderboardGroup
            title="Weekly Leaderboard"
            entries={leaderboard.weekly}
            currentUser="Faisal A."
          />
          <LeaderboardGroup
            title="Monthly Leaderboard"
            entries={leaderboard.monthly}
            currentUser="Faisal A."
            className="mt-6"
          />
          <ActionLink href="/leaderboard" label="Open Full Leaderboard" variant="secondary" className="mt-6" />
        </SoftCard>
      </CardGrid>
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  accent,
  icon,
  chip,
  chart,
  cluster
}: {
  label: string;
  value: string;
  note: string;
  accent: string;
  icon: ReactNode;
  chip?: string;
  chart?: ReactNode;
  cluster?: ReactNode;
}) {
  return (
    <SoftCard className="flex min-h-[182px] flex-col justify-between bg-white/92">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className={clsx("mt-3 text-4xl font-semibold tracking-tight", accent)}>{value}</p>
        </div>
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 shadow-sm">
          {icon}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {chart ?? cluster}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm leading-6 text-slate-500">{note}</p>
          {chip ? <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{chip}</span> : null}
        </div>
      </div>
    </SoftCard>
  );
}

function MiniSparkline({ values }: { values: number[] }) {
  const { points, width, height } = buildSparkline(values);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-10 w-full">
      <polyline fill="none" stroke="#dce7e2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <polyline fill="none" stroke="#008540" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
}

function LeaderboardGroup({
  title,
  entries,
  currentUser,
  className = ""
}: {
  title: string;
  entries: Array<{ name: string; points: number }>;
  currentUser: string;
  className?: string;
}) {
  const topScore = entries[0]?.points ?? 1;

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <div className="mt-4 space-y-3">
        {entries.map((entry, index) => {
          const isCurrentUser = entry.name === currentUser;
          const width = `${Math.max(28, (entry.points / topScore) * 100)}%`;

          return (
            <div
              key={`${title}-${entry.name}`}
              className={clsx(
                "rounded-[24px] border p-4 transition",
                isCurrentUser ? "border-brand-200 bg-brand-50/45 shadow-sm" : "border-slate-200 bg-white"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                      index === 0
                        ? "bg-gold-300/35 text-amber-800"
                        : index === 1
                          ? "bg-slate-200 text-slate-700"
                          : "bg-orange-100 text-orange-700"
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{entry.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                      {isCurrentUser ? "You" : index === 0 ? "Leading" : `${topScore - entry.points} pts behind`}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-brand-700">{entry.points} pts</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={clsx(
                    "h-full rounded-full bg-gradient-to-r",
                    index === 0 ? "from-gold-300 to-amber-500" : isCurrentUser ? "from-brand-500 to-brand-700" : "from-sky-400 to-sky-600"
                  )}
                  style={{ width }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

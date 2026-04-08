import clsx from "clsx";
import { CardGrid, MiniStat, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { leaderboard } from "@/lib/mock-data";

const currentUser = "Faisal A.";

export default function LeaderboardPage() {
  const weeklyTop = leaderboard.weekly[0];
  const monthlyTop = leaderboard.monthly[0];
  const currentWeekly = leaderboard.weekly.find((entry) => entry.name === currentUser) ?? leaderboard.weekly[1];
  const currentMonthly = leaderboard.monthly.find((entry) => entry.name === currentUser) ?? leaderboard.monthly[2];

  return (
    <div className="space-y-6">
      <PageIntro
        title="Leaderboard"
        description="See the top students across the shared rewards system through a cleaner leaderboard view with weekly and monthly comparisons."
        backHref="/dashboard"
      />

      <CardGrid cols="sm:grid-cols-2 xl:grid-cols-4">
        <MiniStat label="Weekly Rank" value={`#${leaderboard.weekly.findIndex((entry) => entry.name === currentUser) + 1}`} subtext="Currently holding second place this week." />
        <MiniStat label="Monthly Rank" value={`#${leaderboard.monthly.findIndex((entry) => entry.name === currentUser) + 1}`} subtext="Position held in the monthly leaderboard." />
        <MiniStat label="Weekly Gap" value={`${weeklyTop.points - currentWeekly.points}`} subtext="Points needed to catch the weekly leader." />
        <MiniStat label="Monthly Gap" value={`${monthlyTop.points - currentMonthly.points}`} subtext="Points needed to match monthly first place." />
      </CardGrid>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SoftCard>
          <SectionTitle title="Weekly Leaderboard" subtitle="Live comparison for the current week with clearer score distance and placement." />
          <LeaderboardGroup entries={leaderboard.weekly} currentUser={currentUser} />
        </SoftCard>

        <SoftCard>
          <SectionTitle title="Monthly Leaderboard" subtitle="Full monthly standing with score bars and a highlighted current-user position." />
          <LeaderboardGroup entries={leaderboard.monthly} currentUser={currentUser} />
        </SoftCard>
      </div>
    </div>
  );
}

function LeaderboardGroup({
  entries,
  currentUser
}: {
  entries: Array<{ name: string; points: number }>;
  currentUser: string;
}) {
  const topScore = entries[0]?.points ?? 1;

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => {
        const isCurrentUser = entry.name === currentUser;
        const width = `${Math.max(28, (entry.points / topScore) * 100)}%`;

        return (
          <div
            key={entry.name}
            className={clsx(
              "rounded-[24px] border p-4 transition",
              isCurrentUser ? "border-brand-200 bg-brand-50/45 shadow-sm" : "border-slate-200 bg-white"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={clsx(
                    "inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold",
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
                    {isCurrentUser ? "Current user" : index === 0 ? "Leading" : `${topScore - entry.points} pts behind`}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">{entry.points} pts</span>
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
  );
}

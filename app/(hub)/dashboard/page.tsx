import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ActionLink, CardGrid, MiniStat, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { campusSnapshot, leaderboard, rewardsSummary, services } from "@/lib/mock-data";
import { getNavIconByTitle } from "@/lib/nav-icons";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="KFUPM Student Hub"
        description="KFUPM Student Hub is a one-stop student service platform that brings together medical help, laundry operations, marketplace tools, and campus-life services from one place. Students can move through daily tasks quickly without switching between separate systems."
        backHref="/"
      />

      <section>
        <SectionTitle title="Campus Snapshot" subtitle="Quick visibility into what is happening across the one-stop service platform right now." />
        <CardGrid cols="md:grid-cols-2 xl:grid-cols-4">
          {campusSnapshot.map((item) => (
            <MiniStat key={item.label} {...item} />
          ))}
        </CardGrid>
      </section>

      <section>
        <SectionTitle title="Core Services" subtitle="The strongest daily-use modules are surfaced here so students can jump into the most important actions in one click." />
        <CardGrid cols="md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = getNavIconByTitle(service.title);

            return (
              <Link
                key={service.href}
                href={service.href}
                className={`group rounded-[28px] border border-white/70 bg-gradient-to-br ${service.tone} p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,133,64,0.18)]`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-white/90 p-3 shadow-sm">
                    {Icon ? <Icon className="h-5 w-5 text-brand-700" /> : null}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700">
                    Open
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              </Link>
            );
          })}
        </CardGrid>
      </section>

      <CardGrid cols="xl:grid-cols-[1.15fr_0.9fr_0.9fr]">
        <SoftCard className="overflow-hidden bg-gradient-to-br from-petrol-700 via-forest to-brand-600 text-white">
          <div className="flex items-center gap-3 text-gold-200">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.24em]">Medical Priority</p>
          </div>
          <h3 className="mt-4 text-3xl font-semibold">Emergency support is one tap away.</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">Open the Medical Emergency module to send an instant alert, submit a full request, review status stages, or coordinate with dispatch and hospital views in the same demo flow.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionLink href="/medical" label="Open Medical Emergency" variant="secondary" className="border-white/20 bg-white text-petrol-700 hover:bg-gold-50" />
            <ActionLink href="/medical/request" label="Request Emergency Help" variant="danger" />
          </div>
        </SoftCard>

        <SoftCard>
          <div className="flex items-center gap-3 text-brand-700">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm uppercase tracking-[0.24em]">Rewards</p>
          </div>
          <h3 className="mt-4 text-3xl font-semibold text-slate-950">{rewardsSummary.totalPoints} pts</h3>
          <p className="mt-2 text-sm text-slate-500">Current rank {rewardsSummary.rank} across the shared student-services rewards layer.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {rewardsSummary.badges.map((badge) => (
              <span key={badge} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {badge}
              </span>
            ))}
          </div>
          <ActionLink href="/rewards" label="Open Rewards" variant="secondary" className="mt-6 w-full" />
        </SoftCard>

        <SoftCard>
          <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Leaderboard Preview</p>
          <div className="mt-4 space-y-3">
            {leaderboard.weekly.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between rounded-[20px] bg-brand-50/60 px-4 py-3">
                <span className="font-medium text-slate-900">
                  {index + 1}. {entry.name}
                </span>
                <span className="text-sm font-semibold text-brand-700">{entry.points} pts</span>
              </div>
            ))}
          </div>
          <ActionLink href="/leaderboard" label="View Full Leaderboard" variant="secondary" className="mt-6 w-full" />
        </SoftCard>
      </CardGrid>
    </div>
  );
}

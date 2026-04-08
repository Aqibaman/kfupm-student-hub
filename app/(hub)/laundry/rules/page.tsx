"use client";

import { PageIntro, SoftCard, SectionTitle } from "@/components/hub";
import { getLaundryCreditsStore } from "@/lib/demo-store";
import { laundryRules } from "@/lib/mock-data";

export default function LaundryRulesPage() {
  const credits = getLaundryCreditsStore();

  return (
    <div className="space-y-6">
      <PageIntro title="Laundry Rules" description="A dedicated rules page for the laundry booking system, credit policy, and check-in expectations." backHref="/laundry" />
      <SoftCard>
        <SectionTitle title="Important Rules / N.B." subtitle="These rules apply across washer and dryer bookings." />
        <div className="grid gap-3 md:grid-cols-2">
          {laundryRules.map((rule) => <div key={rule} className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">{rule}</div>)}
        </div>
      </SoftCard>
      <SoftCard>
        <SectionTitle title="Current Credit Status" subtitle="The demo logic restores access automatically after the punishment window ends." />
        <p className="text-4xl font-semibold text-slate-950">{credits.balance}</p>
        <p className="mt-3 text-sm text-slate-500">{credits.blockedUntil ? `Booking access blocked until ${new Date(credits.blockedUntil).toLocaleDateString()}.` : "Laundry booking access is currently active."}</p>
      </SoftCard>
    </div>
  );
}


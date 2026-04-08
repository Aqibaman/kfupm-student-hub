import { Bell, CheckCircle2, Clock3, Siren, Sparkles } from "lucide-react";
import { CardGrid, PageIntro, SectionTitle, SoftCard } from "@/components/hub";

const notifications = [
  {
    title: "Laundry reminder",
    detail: "Your washer booking starts at 5:00 PM. Check in within the first 15 minutes.",
    time: "2 min ago",
    tone: "text-sky-700 bg-sky-50",
    icon: Clock3
  },
  {
    title: "Bus route update",
    detail: "Bus 04 is approaching station 303. Estimated arrival in 6 minutes.",
    time: "8 min ago",
    tone: "text-brand-700 bg-brand-50",
    icon: Bell
  },
  {
    title: "Medical status changed",
    detail: "Your emergency request moved to On Site. Response team has arrived.",
    time: "18 min ago",
    tone: "text-red-700 bg-red-50",
    icon: Siren
  },
  {
    title: "Rewards earned",
    detail: "You received 5 points for successful laundry slot usage.",
    time: "1 hour ago",
    tone: "text-gold-700 bg-gold-50",
    icon: Sparkles
  }
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Notifications"
        description="A dummy notification center for the prototype, showing the kinds of alerts students would receive from services across the hub."
        backHref="/dashboard"
      />

      <CardGrid cols="md:grid-cols-3">
        <SoftCard>
          <p className="text-sm text-slate-500">Unread Alerts</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">4</p>
          <p className="mt-2 text-sm text-slate-500">Important updates from transport, laundry, medical, and rewards.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Service Sources</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">4</p>
          <p className="mt-2 text-sm text-slate-500">Notifications currently grouped from the core modules in the hub.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Status</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
            <CheckCircle2 className="h-4 w-4" />
            Demo feed active
          </div>
          <p className="mt-3 text-sm text-slate-500">This page is a clickable prototype feed with dummy notification content.</p>
        </SoftCard>
      </CardGrid>

      <SoftCard>
        <SectionTitle title="Recent Notifications" subtitle="Prototype examples of how real alerts would appear for the student." />
        <div className="space-y-3">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[22px] border border-slate-200 bg-white/90 p-4 transition hover:border-brand-200 hover:bg-brand-50/30">
                <div className="flex items-start gap-4">
                  <div className={`rounded-2xl p-3 ${item.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-slate-950">{item.title}</p>
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SoftCard>
    </div>
  );
}

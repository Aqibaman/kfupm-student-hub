import { PageIntro, SoftCard } from "@/components/hub";
import { lostFoundItems } from "@/lib/mock-data";

export default function BrowseItemsPage() {
  const sections = [
    { label: "Lost Items", items: lostFoundItems.lost },
    { label: "Found Items", items: lostFoundItems.found }
  ];

  return (
    <div className="space-y-6">
      <PageIntro title="Browse Items" description="Browse recent lost and found item cards, switch between categories, and start a claim or contact flow." backHref="/lost-found" />
      {sections.map((section) => (
        <section key={section.label}>
          <h2 className="mb-4 text-xl font-semibold text-slate-950">{section.label}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {section.items.map((item) => (
              <SoftCard key={`${section.label}-${item.title}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{item.image}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-500">{item.date} • {item.location}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.status}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="primary-btn" type="button">Claim Item</button>
                  <button className="secondary-btn" type="button">Contact Reporter</button>
                  <button className="secondary-btn" type="button">View Details</button>
                </div>
              </SoftCard>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

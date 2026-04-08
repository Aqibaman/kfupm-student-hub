import { PageIntro, SoftCard } from "@/components/hub";
import { menuByCafe } from "@/lib/mock-data";

export default function TodayMenuPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Today’s Menu" description="See all current food items grouped by cafeteria, with meal type, price, and availability." backHref="/food" />
      <div className="space-y-4">
        {menuByCafe.map((cafeteria) => (
          <SoftCard key={cafeteria.cafeteria}>
            <h3 className="text-xl font-semibold text-slate-950">{cafeteria.cafeteria}</h3>
            <div className="mt-4 space-y-3">
              {cafeteria.items.map((item) => (
                <div key={item.name} className="flex flex-col gap-3 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.type} • {item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.availability}</span>
                    <button className="secondary-btn" type="button">Save Favorite</button>
                  </div>
                </div>
              ))}
            </div>
            <a href="/food" className="secondary-btn mt-5">Back</a>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}

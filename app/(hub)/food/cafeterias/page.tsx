import { PageIntro, SoftCard } from "@/components/hub";
import { cafeterias } from "@/lib/mock-data";

export default function CafeteriaListPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Cafeteria List" description="Explore cafeteria availability, location, and meal types offered around campus." backHref="/food" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cafeterias.map((cafeteria) => (
          <SoftCard key={cafeteria.name}>
            <h3 className="text-xl font-semibold text-slate-950">{cafeteria.name}</h3>
            <p className="mt-2 text-sm text-slate-500">{cafeteria.location}</p>
            <p className="mt-2 text-sm text-slate-700">Status: {cafeteria.status}</p>
            <p className="mt-1 text-sm text-slate-700">Meal types: {cafeteria.meals}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/food/menu" className="primary-btn">View Menu</a>
              <button className="secondary-btn" type="button">View Location</button>
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}

import { ListPanel } from "@/components/module-pages";
import { PageIntro } from "@/components/hub";

export default function MyReportsPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="My Reports" description="Review all lost and found reports you have submitted and track the latest status for each one." backHref="/lost-found" />
      <ListPanel
        title="Submitted Reports"
        items={[
          { title: "Black Wallet", meta: "Apr 6 • Library North Entrance", value: "Open", description: "Lost report awaiting match." },
          { title: "Laptop Charger", meta: "Apr 7 • Cafeteria 3", value: "In Storage", description: "Found report accepted by front desk." }
        ]}
      />
    </div>
  );
}

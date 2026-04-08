import { ModuleHome } from "@/components/module-pages";

export default function LostFoundHomePage() {
  return (
    <ModuleHome
      title="Lost & Found"
      description="Report lost or found items, browse the latest entries, and keep track of your submissions from one place."
      actions={[
        { label: "Report Lost Item", href: "/lost-found/report-lost" },
        { label: "Report Found Item", href: "/lost-found/report-found", variant: "secondary" },
        { label: "Browse Items", href: "/lost-found/browse", variant: "secondary" },
        { label: "My Reports", href: "/lost-found/reports", variant: "secondary" }
      ]}
      stats={[
        { label: "Open Lost Reports", value: "24", detail: "Most reports are around library and dorms." },
        { label: "Found Items Logged", value: "17", detail: "New submissions added today." },
        { label: "Matched Claims", value: "9", detail: "Items recently reconnected with owners." }
      ]}
    />
  );
}

import { PageIntro } from "@/components/hub";
import { BusServicesMap } from "@/components/bus-services-map";

export default function BusServicesPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Bus Services"
        description="Track KFUPM shuttle movement on fixed campus routes through a live GPS-style map, active buses panel, and stop-by-stop route visibility for the buses currently running."
        backHref="/dashboard"
      />
      <BusServicesMap />
    </div>
  );
}

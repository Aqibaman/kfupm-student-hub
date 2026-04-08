import { ActionLink, PageIntro, SoftCard } from "@/components/hub";
import { laundryMachines } from "@/lib/mock-data";

export default function LiveMachineStatusPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Live Machine Status" description="Check each washer and dryer state, including available, reserved, in use, and out-of-service status with the next free time." backHref="/laundry" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {laundryMachines.map((machine) => (
          <SoftCard key={machine.id}>
            <p className="text-sm text-slate-500">{machine.building} • {machine.room}</p>
            <h3 className="mt-2 text-2xl font-semibold">{machine.id}</h3>
            <p className="mt-3 text-sm font-medium text-slate-700">Type: {machine.type}</p>
            <p className="mt-1 text-sm font-medium text-slate-700">State: {machine.state}</p>
            <p className="mt-1 text-sm text-slate-500">Next free time: {machine.nextFreeTime}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ActionLink href={machine.type === "Washer" ? "/laundry/washer" : "/laundry/dryer"} label={`Book ${machine.type}`} variant="primary" />
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}

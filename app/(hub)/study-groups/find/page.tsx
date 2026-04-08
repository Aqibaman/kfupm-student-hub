import { PageIntro, SoftCard } from "@/components/hub";
import { studyGroups } from "@/lib/mock-data";

export default function FindGroupsPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Find Groups" description="Search by course, department, day, or time to find the right study session for your schedule." backHref="/study-groups" />
      <SoftCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <input className="field" placeholder="Course code" />
          <input className="field" placeholder="Department" />
          <input className="field" placeholder="Day" />
          <input className="field" placeholder="Time" />
        </div>
      </SoftCard>
      <div className="grid gap-4 md:grid-cols-2">
        {studyGroups.map((group) => (
          <SoftCard key={group.title}>
            <p className="text-sm font-semibold text-brand-700">{group.course}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">{group.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{group.members} • {group.meetingTime}</p>
            <p className="mt-1 text-sm text-slate-500">{group.location}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="primary-btn" type="button">Join Group</button>
              <button className="secondary-btn" type="button">View Details</button>
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}

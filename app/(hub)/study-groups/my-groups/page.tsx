import { ListPanel } from "@/components/module-pages";
import { PageIntro } from "@/components/hub";

export default function MyGroupsPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="My Groups" description="See the groups you have joined or created, then manage membership or edit details." backHref="/study-groups" />
      <ListPanel
        title="Joined and Created Groups"
        items={[
          { title: "Networks Midterm Sprint", meta: "ICS 324 • Tue 7:30 PM", value: "Created", description: "Library Room 2 • 8/12 members" },
          { title: "Calculus Problem Clinic", meta: "MATH 208 • Wed 6:00 PM", value: "Joined", description: "Online • 5/8 members" }
        ]}
        actions={[
          { href: "/study-groups", label: "Leave Group" },
          { href: "/study-groups/create", label: "Edit Group", variant: "secondary" },
          { href: "/study-groups/find", label: "Open Details", variant: "secondary" }
        ]}
      />
    </div>
  );
}

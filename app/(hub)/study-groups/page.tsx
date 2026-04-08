import { ModuleHome } from "@/components/module-pages";

export default function StudyGroupsHomePage() {
  return (
    <ModuleHome
      title="Study Groups"
      description="Find active study circles, create a new group, and manage the sessions you have joined or organized."
      actions={[
        { label: "Find Groups", href: "/study-groups/find" },
        { label: "Create Group", href: "/study-groups/create", variant: "secondary" },
        { label: "My Groups", href: "/study-groups/my-groups", variant: "secondary" }
      ]}
      stats={[
        { label: "Open Groups", value: "14", detail: "Across engineering, business, and mathematics." },
        { label: "Seats Available", value: "39", detail: "Many evening sessions still have room." },
        { label: "Your Active Groups", value: "3", detail: "Two joined, one created." }
      ]}
    />
  );
}

import { ActionTiles } from "@/components/module-pages";
import { PageIntro } from "@/components/hub";

export default function OthersPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="Others"
        description="Access the additional student services collected here, including study groups, course reviews, campus food, and lost and found."
        backHref="/dashboard"
      />

      <ActionTiles
        items={[
          {
            title: "Study Groups",
            description: "Find active study circles, create a new group, and manage the sessions you have joined or organized.",
            href: "/study-groups"
          },
          {
            title: "Course Reviews",
            description: "Explore course ratings from students, contribute your own review, and track your previous submissions.",
            href: "/course-reviews"
          },
          {
            title: "Campus Food",
            description: "Check open cafeterias, browse menu highlights, and save your favorite meals or locations.",
            href: "/food"
          },
          {
            title: "Lost & Found",
            description: "Report lost or found items, browse the latest entries, and keep track of your submissions.",
            href: "/lost-found"
          }
        ]}
      />
    </div>
  );
}

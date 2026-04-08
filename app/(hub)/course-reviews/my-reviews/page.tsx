import { ListPanel } from "@/components/module-pages";
import { PageIntro } from "@/components/hub";

export default function MyReviewsPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="My Reviews" description="See the course reviews you submitted and manage them if you want to update or remove them." backHref="/course-reviews" />
      <ListPanel
        title="Submitted Reviews"
        items={[
          { title: "ICS 202 - Data Structures", meta: "Overall 4.5", value: "Published", description: "Practical course with strong project work." },
          { title: "COE 308 - Digital Logic Design", meta: "Overall 4.1", value: "Published", description: "Interesting labs, heavy near exams." }
        ]}
        actions={[
          { href: "/course-reviews/write", label: "Edit" },
          { href: "/course-reviews", label: "Delete", variant: "danger" }
        ]}
      />
    </div>
  );
}

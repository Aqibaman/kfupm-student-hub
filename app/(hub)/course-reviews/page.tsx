import { ModuleHome } from "@/components/module-pages";

export default function CourseReviewsHomePage() {
  return (
    <ModuleHome
      title="Course Reviews"
      description="Explore course ratings from students, contribute your own review, and track the reviews you have already written."
      actions={[
        { label: "Browse Courses", href: "/course-reviews/browse" },
        { label: "Write a Review", href: "/course-reviews/write", variant: "secondary" },
        { label: "My Reviews", href: "/course-reviews/my-reviews", variant: "secondary" }
      ]}
      stats={[
        { label: "Courses Listed", value: "128", detail: "Across core, elective, and departmental offerings." },
        { label: "Average Review Rating", value: "4.3", detail: "Based on recent submissions this semester." },
        { label: "Your Reviews", value: "4", detail: "Two reviews submitted this month." }
      ]}
    />
  );
}

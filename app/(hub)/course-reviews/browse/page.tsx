import { PageIntro, SoftCard } from "@/components/hub";
import { courseCatalog } from "@/lib/mock-data";

export default function BrowseCoursesPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Browse Courses" description="Search by course code, title, or department and open the review detail page for any course." backHref="/course-reviews" />
      <SoftCard>
        <div className="grid gap-4 md:grid-cols-3">
          <input className="field" placeholder="Course code" />
          <input className="field" placeholder="Course name" />
          <input className="field" placeholder="Department" />
        </div>
      </SoftCard>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courseCatalog.map((course) => (
          <SoftCard key={course.code}>
            <p className="text-sm font-semibold text-brand-700">{course.code}</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">{course.title}</h3>
            <p className="mt-2 text-sm text-slate-500">Average rating {course.rating} • {course.reviews} reviews</p>
            <a href="/course-reviews/detail" className="primary-btn mt-5">Open Reviews</a>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}

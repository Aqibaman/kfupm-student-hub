import { PageIntro, SoftCard } from "@/components/hub";
import { courseReviewDetails } from "@/lib/mock-data";

export default function CourseDetailPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Course Detail" description="See the average rating, review summaries, and key teaching metrics for the selected course." backHref="/course-reviews" />
      <SoftCard>
        <h2 className="text-2xl font-semibold text-slate-950">{courseReviewDetails.title}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          <div><p className="text-sm text-slate-500">Average Rating</p><p className="mt-1 text-2xl font-semibold">{courseReviewDetails.averageRating}</p></div>
          <div><p className="text-sm text-slate-500">Workload</p><p className="mt-1 text-2xl font-semibold">{courseReviewDetails.workload}</p></div>
          <div><p className="text-sm text-slate-500">Teaching Clarity</p><p className="mt-1 text-2xl font-semibold">{courseReviewDetails.clarity}</p></div>
          <div><p className="text-sm text-slate-500">Assessment Difficulty</p><p className="mt-1 text-2xl font-semibold">{courseReviewDetails.difficulty}</p></div>
        </div>
      </SoftCard>
      <div className="space-y-4">
        {courseReviewDetails.reviews.map((review) => (
          <SoftCard key={review.author}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{review.author}</h3>
                <p className="mt-2 text-sm text-slate-500">{review.comment}</p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{review.rating}</span>
            </div>
          </SoftCard>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <a href="/course-reviews/write" className="primary-btn">Write Review</a>
        <a href="/course-reviews" className="secondary-btn">Back</a>
      </div>
    </div>
  );
}

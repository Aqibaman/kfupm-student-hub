"use client";

import { useRouter } from "next/navigation";
import { SimpleFormPage } from "@/components/module-pages";
import { awardPoints } from "@/lib/demo-store";

export default function WriteReviewPage() {
  const router = useRouter();

  return (
    <SimpleFormPage title="Write Review" description="Add your overall rating, workload, clarity, difficulty, and comments for a course you completed." backHref="/course-reviews">
      <div className="grid gap-5 lg:grid-cols-2">
        <div><label className="label">Course Code</label><input className="field" placeholder="ICS 202" /></div>
        <div><label className="label">Overall Rating</label><input className="field" placeholder="4.5" /></div>
        <div><label className="label">Workload</label><input className="field" placeholder="4" /></div>
        <div><label className="label">Clarity</label><input className="field" placeholder="5" /></div>
        <div><label className="label">Difficulty</label><input className="field" placeholder="4" /></div>
        <div className="lg:col-span-2"><label className="label">Comment</label><textarea className="field min-h-28" placeholder="Practical assignments, clear lectures, and fair grading." /></div>
        <div className="flex flex-wrap gap-3 lg:col-span-2">
          <button className="primary-btn" type="button" onClick={() => { awardPoints("Course review submitted", 18); router.push("/course-reviews/my-reviews"); }}>Submit Review</button>
          <button className="secondary-btn" type="button" onClick={() => router.push("/course-reviews")}>Cancel</button>
        </div>
      </div>
    </SimpleFormPage>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { SimpleFormPage } from "@/components/module-pages";
import { awardPoints } from "@/lib/demo-store";

export default function CreateGroupPage() {
  const router = useRouter();

  return (
    <SimpleFormPage title="Create Group" description="Start a new study group with a course code, schedule, location, and maximum capacity." backHref="/study-groups">
      <div className="grid gap-5 lg:grid-cols-2">
        <div><label className="label">Course Code</label><input className="field" placeholder="ICS 324" /></div>
        <div><label className="label">Group Name</label><input className="field" placeholder="Networks Midterm Sprint" /></div>
        <div className="lg:col-span-2"><label className="label">Description</label><textarea className="field min-h-28" placeholder="Focused problem-solving session before the midterm." /></div>
        <div><label className="label">Meeting Day</label><input className="field" placeholder="Tuesday" /></div>
        <div><label className="label">Meeting Time</label><input className="field" placeholder="7:30 PM" /></div>
        <div><label className="label">Location or Online Link</label><input className="field" placeholder="Library Room 2 or Teams URL" /></div>
        <div><label className="label">Max Members</label><input className="field" placeholder="12" /></div>
        <div className="flex flex-wrap gap-3 lg:col-span-2">
          <button className="primary-btn" type="button" onClick={() => { awardPoints("Study group created", 25); router.push("/study-groups/my-groups"); }}>Create Group</button>
          <button className="secondary-btn" type="button" onClick={() => router.push("/study-groups")}>Cancel</button>
        </div>
      </div>
    </SimpleFormPage>
  );
}

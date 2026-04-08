"use client";

import { useRouter } from "next/navigation";
import { SimpleFormPage } from "@/components/module-pages";
import { awardPoints } from "@/lib/demo-store";

export default function ReportLostItemPage() {
  const router = useRouter();

  return (
    <SimpleFormPage title="Report Lost Item" description="Tell the community what you lost, where you last saw it, and any helpful details for matching." backHref="/lost-found">
      <div className="grid gap-5 lg:grid-cols-2">
        <div><label className="label">Item Name</label><input className="field" placeholder="Black wallet" /></div>
        <div><label className="label">Category</label><input className="field" placeholder="Personal item" /></div>
        <div><label className="label">Color</label><input className="field" placeholder="Black" /></div>
        <div><label className="label">Last Seen Location</label><input className="field" placeholder="Library North Entrance" /></div>
        <div><label className="label">Date</label><input className="field" type="date" /></div>
        <div><label className="label">Image Upload</label><input className="field" placeholder="wallet.jpg" /></div>
        <div className="lg:col-span-2"><label className="label">Description</label><textarea className="field min-h-28" placeholder="Brown leather interior and student ID inside." /></div>
        <div className="flex flex-wrap gap-3 lg:col-span-2">
          <button className="primary-btn" type="button" onClick={() => { awardPoints("Lost item report submitted", 10); router.push("/lost-found/reports"); }}>Submit Lost Report</button>
          <button className="secondary-btn" type="button" onClick={() => router.push("/lost-found")}>Cancel</button>
        </div>
      </div>
    </SimpleFormPage>
  );
}

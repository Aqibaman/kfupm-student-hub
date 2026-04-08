"use client";

import { useRouter } from "next/navigation";
import { SimpleFormPage } from "@/components/module-pages";
import { awardPoints } from "@/lib/demo-store";

export default function ReportFoundItemPage() {
  const router = useRouter();

  return (
    <SimpleFormPage title="Report Found Item" description="Log found items with enough detail so the owner can recognize and claim them." backHref="/lost-found">
      <div className="grid gap-5 lg:grid-cols-2">
        <div><label className="label">Item Name</label><input className="field" placeholder="Laptop charger" /></div>
        <div><label className="label">Category</label><input className="field" placeholder="Electronics" /></div>
        <div><label className="label">Found Location</label><input className="field" placeholder="Cafeteria 3" /></div>
        <div><label className="label">Date</label><input className="field" type="date" /></div>
        <div><label className="label">Image Upload</label><input className="field" placeholder="charger.jpg" /></div>
        <div className="lg:col-span-2"><label className="label">Description</label><textarea className="field min-h-28" placeholder="Black charger with label sticker on the cable." /></div>
        <div className="flex flex-wrap gap-3 lg:col-span-2">
          <button className="primary-btn" type="button" onClick={() => { awardPoints("Found item report submitted", 12); router.push("/lost-found/reports"); }}>Submit Found Report</button>
          <button className="secondary-btn" type="button" onClick={() => router.push("/lost-found")}>Cancel</button>
        </div>
      </div>
    </SimpleFormPage>
  );
}

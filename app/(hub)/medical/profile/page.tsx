"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageIntro, SoftCard } from "@/components/hub";
import { getMedicalProfile, saveMedicalProfile } from "@/lib/demo-store";

export default function MedicalProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(getMedicalProfile());
  const [isEditing, setIsEditing] = useState(false);

  function handleSave() {
    saveMedicalProfile(profile);
    setIsEditing(false);
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Medical Profile" description="Keep your blood group, conditions, allergies, medications, and special notes ready so the emergency team can work faster." backHref="/medical" />
      <SoftCard>
        <div className="grid gap-5 lg:grid-cols-2">
          <div><label className="label">Blood Group</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={profile.bloodGroup} onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })} /></div>
          <div><label className="label">Allergies</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={profile.allergies} onChange={(e) => setProfile({ ...profile, allergies: e.target.value })} /></div>
          <div><label className="label">Chronic Diseases</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={profile.chronicDiseases} onChange={(e) => setProfile({ ...profile, chronicDiseases: e.target.value })} /></div>
          <div><label className="label">Medications</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={profile.medications} onChange={(e) => setProfile({ ...profile, medications: e.target.value })} /></div>
          <div className="lg:col-span-2"><label className="label">Special Notes</label><textarea disabled={!isEditing} className="field min-h-32 disabled:bg-slate-50" value={profile.notes} onChange={(e) => setProfile({ ...profile, notes: e.target.value })} /></div>
          <div className="flex flex-wrap gap-3 lg:col-span-2">
            <button className="primary-btn" type="button" onClick={handleSave}>Save Medical Profile</button>
            <button className="secondary-btn" type="button" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="secondary-btn" type="button" onClick={() => router.push("/medical")}>Back</button>
          </div>
        </div>
      </SoftCard>
    </div>
  );
}
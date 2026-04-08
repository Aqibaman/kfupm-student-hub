"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ActionLink, PageIntro, SoftCard } from "@/components/hub";
import { getEmergencyContactsStore, getMedicalProfile, saveEmergencyRequest } from "@/lib/demo-store";
import { primaryStudent } from "@/lib/mock-data";

const emergencyTypes = ["chest pain", "breathing problem", "stroke signs", "accident", "bleeding", "pregnancy emergency", "child emergency", "other"];
const severities = ["Critical", "Urgent", "Moderate"] as const;
const fallbackLocation = "24.8607, 50.0626 - Near KFUPM Library";

export default function EmergencyRequestPage() {
  const router = useRouter();
  const [attachments, setAttachments] = useState<string[]>([]);
  const [form, setForm] = useState({
    emergencyType: "breathing problem",
    symptoms: "",
    severity: "Urgent" as (typeof severities)[number],
    location: fallbackLocation
  });

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).map((file) => file.name);
    setAttachments(files);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = `EM-${Math.floor(10000 + Math.random() * 90000)}`;
    saveEmergencyRequest({
      id,
      studentName: primaryStudent.name,
      emergencyType: form.emergencyType,
      symptoms: form.symptoms,
      severity: form.severity,
      location: form.location,
      attachments,
      medicalProfileSnapshot: getMedicalProfile(),
      emergencyContactsSnapshot: getEmergencyContactsStore(),
      stage: "Request Received",
      statusState: "Pending",
      responderUnit: "Pending assignment",
      eta: "Dispatch pending",
      destinationHospital: "KFUPM Medical Center",
      timeSubmitted: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      requestMode: "Manual Emergency Request"
    });
    router.push(`/medical/status?requestId=${id}`);
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Emergency Request Form" description="Fill the full request so dispatch receives the emergency type, symptoms, severity, editable location, and any optional attachments before assignment." backHref="/medical" />
      <SoftCard>
        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-2">
          <div>
            <label className="label">Emergency Type</label>
            <select className="field" value={form.emergencyType} onChange={(event) => setForm({ ...form, emergencyType: event.target.value })}>
              {emergencyTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Location</label>
            <input className="field" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
          </div>
          <div className="lg:col-span-2">
            <label className="label">Symptoms</label>
            <textarea className="field min-h-32" placeholder="Describe what the student is experiencing right now." value={form.symptoms} onChange={(event) => setForm({ ...form, symptoms: event.target.value })} required />
          </div>
          <div className="lg:col-span-2">
            <label className="label">Severity</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {severities.map((severity) => (
                <button
                  key={severity}
                  type="button"
                  onClick={() => setForm({ ...form, severity })}
                  className={form.severity === severity ? "primary-btn" : "secondary-btn"}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <label className="label">Attachments (Optional)</label>
            <label className="mt-2 flex min-h-[110px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-brand-200 bg-brand-50/40 px-6 py-5 text-center text-sm text-slate-500">
              <span className="font-semibold text-brand-700">Upload image, audio, or video</span>
              <span className="mt-1">Local preview by file name is enough for this prototype.</span>
              <input type="file" className="hidden" multiple onChange={handleAttachmentChange} />
            </label>
            {attachments.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {attachments.map((item) => (
                  <span key={item} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{item}</span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-2">
            <button type="submit" className="danger-btn">Submit Request</button>
            <button type="button" className="secondary-btn" onClick={() => router.push("/medical")}>Cancel</button>
            <ActionLink href="/medical" label="Back" variant="secondary" />
          </div>
        </form>
      </SoftCard>
    </div>
  );
}

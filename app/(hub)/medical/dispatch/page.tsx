"use client";

import { useMemo, useState } from "react";
import { PhoneCall } from "lucide-react";
import { PageIntro, SoftCard, SectionTitle } from "@/components/hub";
import { emergencyStages } from "@/lib/emergency";
import { getEmergencyRequests, updateEmergencyRequest } from "@/lib/demo-store";

const hospitals = ["KFUPM Medical Center", "Dhahran Central Unit", "Campus Emergency Receiving Bay"];
const units = ["Unit 03 - Rapid Response", "Unit 07 - Paramedic Reem", "Unit 11 - Ambulance East"];

export default function DispatchDashboardPage() {
  const [requests, setRequests] = useState(() => getEmergencyRequests());
  const [selectedId, setSelectedId] = useState(requests[0]?.id ?? "");
  const selected = useMemo(() => requests.find((request) => request.id === selectedId) ?? requests[0] ?? null, [requests, selectedId]);

  function updateCase(updates: Parameters<typeof updateEmergencyRequest>[1]) {
    if (!selected) return;
    updateEmergencyRequest(selected.id, updates);
    setRequests(getEmergencyRequests());
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Dispatch Dashboard" description="Dispatchers can see the same request-stage model used on the student status page and update assignment, ETA, hospital destination, and response progress from one place." backHref="/medical" />
      <SoftCard>
        <SectionTitle title="Incoming Cases" subtitle="Current Stage and Status State use the exact same labels as the student and hospital views." />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                {["Request ID", "Student Name", "Emergency Type", "Location", "Current Stage", "Status State", "Time Submitted", "Assigned Unit", "Destination Hospital"].map((header) => (
                  <th key={header} className="px-3 py-3 font-medium">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className={`border-b border-slate-100 transition hover:bg-brand-50/50 ${selected?.id === request.id ? "bg-brand-50/70" : ""}`}>
                  <td className="px-3 py-4"><button type="button" className="font-semibold text-brand-700" onClick={() => setSelectedId(request.id)}>{request.id}</button></td>
                  <td className="px-3 py-4">{request.studentName}</td>
                  <td className="px-3 py-4 capitalize">{request.emergencyType}</td>
                  <td className="px-3 py-4">{request.location}</td>
                  <td className="px-3 py-4">{request.stage}</td>
                  <td className="px-3 py-4">{request.statusState}</td>
                  <td className="px-3 py-4">{request.timeSubmitted}</td>
                  <td className="px-3 py-4">{request.responderUnit}</td>
                  <td className="px-3 py-4">{request.destinationHospital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SoftCard>

      {selected ? (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SoftCard>
            <SectionTitle title="Case Details Panel" subtitle="Open any request to see the responder context needed for dispatch decisions." />
            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-600">
              <div><span className="font-semibold text-slate-900">Student name:</span> {selected.studentName}</div>
              <div><span className="font-semibold text-slate-900">Emergency type:</span> {selected.emergencyType}</div>
              <div><span className="font-semibold text-slate-900">Severity:</span> {selected.severity}</div>
              <div><span className="font-semibold text-slate-900">Current stage:</span> {selected.stage}</div>
              <div className="md:col-span-2"><span className="font-semibold text-slate-900">Symptoms:</span> {selected.symptoms}</div>
              <div className="md:col-span-2"><span className="font-semibold text-slate-900">Location:</span> {selected.location}</div>
              <div className="md:col-span-2"><span className="font-semibold text-slate-900">Attachments:</span> {selected.attachments.length ? selected.attachments.join(", ") : "No attachments shared"}</div>
              <div className="md:col-span-2"><span className="font-semibold text-slate-900">Medical profile summary:</span> {selected.medicalProfileSnapshot.bloodGroup}, {selected.medicalProfileSnapshot.chronicDiseases}, allergy to {selected.medicalProfileSnapshot.allergies}.</div>
              <div className="md:col-span-2"><span className="font-semibold text-slate-900">Roommates / friends emergency contacts:</span> {selected.emergencyContactsSnapshot.map((contact) => `${contact.name} (${contact.relationship})`).join(", ")}</div>
              <div><span className="font-semibold text-slate-900">Responder / unit:</span> {selected.responderUnit}</div>
              <div><span className="font-semibold text-slate-900">Destination hospital:</span> {selected.destinationHospital}</div>
              <div><span className="font-semibold text-slate-900">ETA:</span> {selected.eta}</div>
            </div>
          </SoftCard>

          <SoftCard>
            <SectionTitle title="Dispatcher Actions" subtitle="These changes persist locally and update the student and hospital dashboards immediately." />
            <div className="flex flex-wrap gap-3">
              {emergencyStages.slice(1).map((stage) => (
                <button key={stage} className={stage === "Complete" ? "danger-btn" : "secondary-btn"} type="button" onClick={() => updateCase({ stage })}>
                  {stage === "Help Assigned" ? "Mark as Help Assigned" : stage === "On the Way" ? "Mark as On the Way" : stage === "On Site" ? "Mark as On Site" : "Mark as Complete"}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="label">Assign Unit</label>
                <select className="field" value={selected.responderUnit} onChange={(event) => updateCase({ responderUnit: event.target.value, stage: "Help Assigned" })}>
                  {[selected.responderUnit, ...units].filter((item, index, all) => all.indexOf(item) === index).map((unit) => <option key={unit}>{unit}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Select Hospital</label>
                <select className="field" value={selected.destinationHospital} onChange={(event) => updateCase({ destinationHospital: event.target.value })}>
                  {[selected.destinationHospital, ...hospitals].filter((item, index, all) => all.indexOf(item) === index).map((hospital) => <option key={hospital}>{hospital}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Update ETA</label>
                <input className="field" value={selected.eta} onChange={(event) => updateCase({ eta: event.target.value })} />
              </div>
              <a href="tel:+966553218890" className="primary-btn w-full"><PhoneCall className="h-4 w-4" />Call Student</a>
            </div>
          </SoftCard>
        </div>
      ) : null}
    </div>
  );
}

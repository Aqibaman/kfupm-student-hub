"use client";

import { useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { PageIntro, SoftCard, SectionTitle } from "@/components/hub";
import { getEmergencyRequests, updateEmergencyRequest } from "@/lib/demo-store";

export default function HospitalDashboardPage() {
  const [requests, setRequests] = useState(() => getEmergencyRequests());
  const [selectedId, setSelectedId] = useState(requests[0]?.id ?? "");
  const selected = useMemo(() => requests.find((request) => request.id === selectedId) ?? requests[0] ?? null, [requests, selectedId]);

  function updateCase(id: string, updates: Parameters<typeof updateEmergencyRequest>[1]) {
    updateEmergencyRequest(id, updates);
    setRequests(getEmergencyRequests());
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Hospital Dashboard" description="Hospital staff can monitor which patient is still pending, which case is active, and which request has been completed using the same stage model seen elsewhere in the hub." backHref="/medical" />
      <SoftCard>
        <SectionTitle title="Incoming Cases" subtitle="Pending, active, and completed cases are visually separated so receiving teams can prepare accurately." />
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                {["Request ID", "Student Name", "Emergency Type", "Severity", "Current Stage", "Status State", "ETA", "Assigned Unit", "Destination Hospital / Receiving Unit"].map((header) => (
                  <th key={header} className="px-3 py-3 font-medium">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => {
                const rowTone = request.statusState === "Pending" ? "bg-slate-50" : request.statusState === "In Progress" ? "bg-gold-50/60" : "bg-brand-50/60";

                return (
                  <tr key={request.id} className={`border-b border-slate-100 ${rowTone}`}>
                    <td className="px-3 py-4"><button type="button" onClick={() => setSelectedId(request.id)} className="font-semibold text-brand-700">{request.id}</button></td>
                    <td className="px-3 py-4">{request.studentName}</td>
                    <td className="px-3 py-4 capitalize">{request.emergencyType}</td>
                    <td className="px-3 py-4">{request.severity}</td>
                    <td className="px-3 py-4">{request.stage}</td>
                    <td className="px-3 py-4">{request.statusState}</td>
                    <td className="px-3 py-4">{request.eta}</td>
                    <td className="px-3 py-4">{request.responderUnit}</td>
                    <td className="px-3 py-4">{request.destinationHospital}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SoftCard>

      <SoftCard>
        <SectionTitle title="Hospital Actions" subtitle="Hospital staff can prepare intake, inspect details, or complete the case from the receiving side." />
        <div className="flex flex-wrap gap-3">
          <button type="button" className="secondary-btn" onClick={() => selected && updateCase(selected.id, { eta: "Preparing intake" })}>Mark Preparing</button>
          <button type="button" className="secondary-btn" onClick={() => selected && setSelectedId(selected.id)}><Eye className="h-4 w-4" />View Patient Details</button>
          <button type="button" className="primary-btn" onClick={() => selected && updateCase(selected.id, { stage: "Complete" })}>Mark Received / Complete</button>
        </div>
      </SoftCard>

      {selected ? (
        <SoftCard>
          <SectionTitle title="Patient Details" subtitle="This panel helps the hospital team review the current case before intake is complete." />
          <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-600">
            <div><span className="font-semibold text-slate-900">Student name:</span> {selected.studentName}</div>
            <div><span className="font-semibold text-slate-900">Emergency type:</span> {selected.emergencyType}</div>
            <div><span className="font-semibold text-slate-900">Severity:</span> {selected.severity}</div>
            <div><span className="font-semibold text-slate-900">Current stage:</span> {selected.stage}</div>
            <div><span className="font-semibold text-slate-900">Status state:</span> {selected.statusState}</div>
            <div><span className="font-semibold text-slate-900">Receiving unit:</span> {selected.destinationHospital}</div>
            <div><span className="font-semibold text-slate-900">ETA:</span> {selected.eta}</div>
            <div><span className="font-semibold text-slate-900">Assigned unit:</span> {selected.responderUnit}</div>
            <div className="md:col-span-2"><span className="font-semibold text-slate-900">Symptoms:</span> {selected.symptoms}</div>
            <div className="md:col-span-2"><span className="font-semibold text-slate-900">Attachments:</span> {selected.attachments.length ? selected.attachments.join(", ") : "No attachments shared"}</div>
          </div>
        </SoftCard>
      ) : null}
    </div>
  );
}
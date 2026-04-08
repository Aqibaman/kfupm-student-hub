"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { MessageSquareMore, PhoneCall } from "lucide-react";
import { EmergencyTimeline } from "@/components/emergency-timeline";
import { ActionLink, CardGrid, PageIntro, SoftCard } from "@/components/hub";
import { getEmergencyRequestById } from "@/lib/demo-store";

export default function EmergencyStatusPage() {
  return (
    <Suspense fallback={<div className="space-y-6"><PageIntro title="Emergency Status" description="Loading your emergency request." backHref="/medical" /></div>}>
      <EmergencyStatusContent />
    </Suspense>
  );
}

function EmergencyStatusContent() {
  const params = useSearchParams();
  const request = useMemo(() => getEmergencyRequestById(params.get("requestId")), [params]);

  if (!request) return null;

  return (
    <div className="space-y-6">
      <PageIntro title="Emergency Status" description="Track the exact response stage, responder details, ETA, destination hospital, and contact options from the student-facing view." backHref="/medical" />
      <SoftCard>
        <EmergencyTimeline currentStage={request.stage} />
      </SoftCard>
      <CardGrid cols="lg:grid-cols-[1.05fr_0.95fr]">
        <SoftCard>
          <div className="grid gap-4 md:grid-cols-2">
            <div><p className="text-sm text-slate-500">Request ID</p><p className="mt-1 text-xl font-semibold">{request.id}</p></div>
            <div><p className="text-sm text-slate-500">Emergency Type</p><p className="mt-1 text-xl font-semibold capitalize">{request.emergencyType}</p></div>
            <div><p className="text-sm text-slate-500">Severity</p><p className="mt-1 text-xl font-semibold">{request.severity}</p></div>
            <div><p className="text-sm text-slate-500">Current Stage</p><p className="mt-1 text-xl font-semibold">{request.stage}</p></div>
            <div className="md:col-span-2"><p className="text-sm text-slate-500">Submitted Location</p><p className="mt-1 text-lg font-medium">{request.location}</p></div>
            <div className="md:col-span-2"><p className="text-sm text-slate-500">Symptoms</p><p className="mt-1 text-base leading-7 text-slate-600">{request.symptoms}</p></div>
          </div>
        </SoftCard>
        <SoftCard>
          <div className="space-y-4">
            <div><p className="text-sm text-slate-500">Status State</p><p className="mt-1 text-lg font-semibold">{request.statusState}</p></div>
            <div><p className="text-sm text-slate-500">Responder / Unit Name</p><p className="mt-1 text-lg font-semibold">{request.responderUnit}</p></div>
            <div><p className="text-sm text-slate-500">ETA</p><p className="mt-1 text-lg font-semibold">{request.eta}</p></div>
            <div><p className="text-sm text-slate-500">Destination Hospital</p><p className="mt-1 text-lg font-semibold">{request.destinationHospital}</p></div>
            <div className="pt-3 text-sm text-slate-500">Attachments: {request.attachments.length ? request.attachments.join(", ") : "No attachments shared"}</div>
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="tel:937" className="primary-btn"><PhoneCall className="h-4 w-4" />Call Support</a>
              <button className="secondary-btn" type="button"><MessageSquareMore className="h-4 w-4" />Chat Support</button>
              <ActionLink href="/dashboard" label="Back to Dashboard" variant="secondary" />
            </div>
          </div>
        </SoftCard>
      </CardGrid>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Ambulance, HeartPulse, Loader2, LocateFixed, ShieldCheck } from "lucide-react";
import { EmergencyTimeline } from "@/components/emergency-timeline";
import { ActionLink, CardGrid, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { getEmergencyContactsStore, getEmergencyRequests, getMedicalProfile, saveEmergencyRequest } from "@/lib/demo-store";
import { primaryStudent } from "@/lib/mock-data";

const fallbackLocation = "24.8607, 50.0626 - Near KFUPM Library";

function getAutoCapturedLocation(): Promise<string> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return Promise.resolve(fallbackLocation);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)} - Auto-captured GPS`),
      () => resolve(fallbackLocation),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  });
}

export default function MedicalLandingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");
  const requests = useMemo(() => getEmergencyRequests(), []);
  const latestRequest = requests[0] ?? null;
  const profile = useMemo(() => getMedicalProfile(), []);
  const contacts = useMemo(() => getEmergencyContactsStore(), []);

  async function handleInstantEmergencyRequest() {
    setIsSubmitting(true);
    setRequestError("");

    try {
      const location = await getAutoCapturedLocation();
      const id = `EM-${Math.floor(10000 + Math.random() * 90000)}`;

      saveEmergencyRequest({
        id,
        studentName: primaryStudent.name,
        emergencyType: "other",
        symptoms: "Instant emergency alert sent without the full form. Student requires immediate support.",
        severity: "Critical",
        location,
        attachments: [],
        medicalProfileSnapshot: profile,
        emergencyContactsSnapshot: contacts,
        stage: "Request Received",
        statusState: "Pending",
        responderUnit: "Dispatcher reviewing case",
        eta: "Dispatching now",
        destinationHospital: "KFUPM Medical Center",
        timeSubmitted: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        requestMode: "Instant Emergency Request"
      });

      router.push(`/medical/status?requestId=${id}`);
    } catch {
      setRequestError("We could not send the instant emergency alert. Please try again or use the full emergency request form.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageIntro
        title="Medical Emergency"
        description="The strongest service in the hub. Students can send an instant alert, submit a full emergency request, manage medical readiness details, and follow the same live request stages seen by dispatch and hospital staff."
        backHref="/dashboard"
      />

      <CardGrid cols="md:grid-cols-2 xl:grid-cols-4">
        <SoftCard>
          <p className="text-sm text-slate-500">Average ETA</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><HeartPulse className="h-5 w-5" /></div>
            <p className="text-4xl font-semibold text-slate-950">7 min</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">Based on current campus dispatch load and unit availability.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Active Units</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Ambulance className="h-5 w-5" /></div>
            <p className="text-4xl font-semibold text-slate-950">4</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">Two ambulances and two rapid responders are available right now.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Saved Medical Profile</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><ShieldCheck className="h-5 w-5" /></div>
            <p className="text-4xl font-semibold text-slate-950">Ready</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">Blood group, conditions, allergies, and medications are available to share with dispatch.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Latest Request</p>
          <p className="mt-4 text-2xl font-semibold text-slate-950">{latestRequest?.id ?? "No active request"}</p>
          <p className="mt-3 text-sm leading-6 text-slate-500">{latestRequest ? `${latestRequest.stage} - ${latestRequest.eta}` : "You can create an instant or manual emergency request from here."}</p>
        </SoftCard>
      </CardGrid>

      <SoftCard>
        <SectionTitle title="Request Status" subtitle="The same stage labels are shared across the student, dispatch, and hospital views." />
        {latestRequest ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Request ID</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{latestRequest.id}</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Emergency Type</p>
                <p className="mt-2 text-xl font-semibold capitalize text-slate-950">{latestRequest.emergencyType}</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Current Stage</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{latestRequest.stage}</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-4">
                <p className="text-sm text-slate-500">Responder / ETA</p>
                <p className="mt-2 text-base font-semibold text-slate-950">{latestRequest.responderUnit}</p>
                <p className="mt-1 text-sm text-slate-500">{latestRequest.eta}</p>
              </div>
            </div>
            <EmergencyTimeline currentStage={latestRequest.stage} />
          </div>
        ) : (
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">No request yet. Start with an instant alert or the full emergency request form.</div>
        )}
      </SoftCard>

      <SoftCard>
        <SectionTitle title="Quick Actions" subtitle="Jump directly into the core emergency workflows without leaving the module." />
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleInstantEmergencyRequest} disabled={isSubmitting} className="danger-btn w-full sm:w-auto sm:min-w-[260px]">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <AlertTriangle className="h-4 w-4" />}
            Instant Emergency Request
          </button>
          <ActionLink href="/medical/request" label="Request Emergency Help" variant="danger" />
          <ActionLink href="/medical/status" label="View My Emergency Requests" variant="primary" />
          <ActionLink href="/medical/profile" label="Medical Profile" variant="secondary" />
          <ActionLink href="/medical/contacts" label="Emergency Contacts" variant="secondary" />
          <ActionLink href="/medical/dispatch" label="Dispatch Dashboard" variant="secondary" />
          <ActionLink href="/medical/hospital" label="Hospital Dashboard" variant="secondary" />
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700">
          <LocateFixed className="h-3.5 w-3.5" />
          Instant request auto-captures mock GPS and sends the alert immediately.
        </div>
        {requestError ? <p className="mt-3 text-sm font-medium text-red-600">{requestError}</p> : null}
      </SoftCard>
    </div>
  );
}

import { Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { CardGrid, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { primaryStudent } from "@/lib/mock-data";

export default function UserInformationPage() {
  return (
    <div className="space-y-6">
      <PageIntro
        title="User Information"
        description="A student information page for the prototype, showing profile identity, contact details, academic info, and account readiness details."
        backHref="/dashboard"
      />

      <CardGrid cols="md:grid-cols-2 xl:grid-cols-4">
        <SoftCard>
          <p className="text-sm text-slate-500">Student Name</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{primaryStudent.name}</p>
          <p className="mt-2 text-sm text-slate-500">Primary account holder in the KFUPM Student Hub demo.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Student ID</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{primaryStudent.id}</p>
          <p className="mt-2 text-sm text-slate-500">Used across services for bookings, requests, and activity tracking.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Department</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{primaryStudent.department}</p>
          <p className="mt-2 text-sm text-slate-500">Academic profile currently tied to the signed-in dashboard session.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Year</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{primaryStudent.year}</p>
          <p className="mt-2 text-sm text-slate-500">Student standing shown for a more complete profile experience.</p>
        </SoftCard>
      </CardGrid>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <SoftCard>
          <SectionTitle title="Profile Details" subtitle="Core account and contact information for the signed-in student." />
          <div className="space-y-3">
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><UserRound className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="font-semibold text-slate-950">{primaryStudent.name}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-semibold text-slate-950">{primaryStudent.email}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm text-slate-500">Dorm / Residence</p>
                  <p className="font-semibold text-slate-950">{primaryStudent.dorm}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-semibold text-slate-950">+966 55 278 4410</p>
                </div>
              </div>
            </div>
          </div>
        </SoftCard>

        <SoftCard>
          <SectionTitle title="Account Readiness" subtitle="Helpful demo information connected to the student identity in the hub." />
          <div className="space-y-4">
            <div className="rounded-[22px] border border-brand-100 bg-brand-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white p-3 text-brand-700 shadow-sm"><ShieldCheck className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm text-slate-500">Medical Profile</p>
                  <p className="font-semibold text-slate-950">Ready and connected to emergency requests</p>
                </div>
              </div>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <p className="text-sm text-slate-500">Rewards Rank</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">Rank #12</p>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <p className="text-sm text-slate-500">Laundry Access</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">Active</p>
            </div>
            <div className="rounded-[22px] border border-slate-200 bg-white/90 p-4">
              <p className="text-sm text-slate-500">Transport Access</p>
              <p className="mt-1 text-xl font-semibold text-slate-950">Live route monitoring enabled</p>
            </div>
          </div>
        </SoftCard>
      </div>
    </div>
  );
}

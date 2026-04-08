"use client";

import { AlertTriangle, Clock3, Droplets, Shirt } from "lucide-react";
import { ActionLink, CardGrid, PageIntro, SectionTitle, SoftCard } from "@/components/hub";
import { getLaundryBookings, getLaundryCreditsStore } from "@/lib/demo-store";
import { laundryMachines, laundryRules } from "@/lib/mock-data";
import { getLaundryOverviewStats } from "@/lib/laundry";

export default function LaundryOverviewPage() {
  const bookings = getLaundryBookings();
  const credits = getLaundryCreditsStore();
  const stats = getLaundryOverviewStats(laundryMachines, bookings);

  return (
    <div className="space-y-6">
      <PageIntro title="Laundry Queue" description="A structured campus reservation system for washers and dryers. Students book separate machine types, follow a 15-minute check-in window, and stay within the credit and penalty rules shown in the module." backHref="/dashboard" />

      <CardGrid cols="md:grid-cols-2 xl:grid-cols-5">
        <SoftCard>
          <p className="text-sm text-slate-500">Available Washers</p>
          <div className="mt-4 flex items-center gap-3"><div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Shirt className="h-5 w-5" /></div><p className="text-4xl font-semibold">{stats.washersAvailable}</p></div>
          <p className="mt-3 text-sm text-slate-500">Washer booking is handled separately from dryer booking.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Available Dryers</p>
          <div className="mt-4 flex items-center gap-3"><div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Droplets className="h-5 w-5" /></div><p className="text-4xl font-semibold">{stats.dryersAvailable}</p></div>
          <p className="mt-3 text-sm text-slate-500">Dryers use their own machine list, slots, and schedule.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Occupied Machines</p>
          <div className="mt-4 flex items-center gap-3"><div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Clock3 className="h-5 w-5" /></div><p className="text-4xl font-semibold">{stats.occupiedMachines}</p></div>
          <p className="mt-3 text-sm text-slate-500">Reserved and in-use machines are included here.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Next Free Slot</p>
          <div className="mt-4 flex items-center gap-3"><div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Clock3 className="h-5 w-5" /></div><p className="text-3xl font-semibold">{stats.nextFreeSlot}</p></div>
          <p className="mt-3 text-sm text-slate-500">This already reflects the enforced 15-minute buffer between reservations.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Upcoming Personal Booking</p>
          <p className="mt-4 text-xl font-semibold text-slate-950">{stats.nextUpcomingBooking ? `${stats.nextUpcomingBooking.machineType} ${stats.nextUpcomingBooking.machineId}` : "None"}</p>
          <p className="mt-3 text-sm text-slate-500">{stats.nextUpcomingBooking ? `${stats.nextUpcomingBooking.bookingDate} - ${stats.nextUpcomingBooking.startTime} - Check in by ${stats.nextUpcomingBooking.checkInDeadline}` : "No upcoming booking yet."}</p>
        </SoftCard>
      </CardGrid>

      <CardGrid cols="xl:grid-cols-[1.05fr_0.95fr]">
        <SoftCard>
          <SectionTitle title="Quick Actions" subtitle="Choose machine type first, then reserve by room, machine, date, and available slot." />
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/laundry/washer" label="Book Washer" variant="primary" />
            <ActionLink href="/laundry/dryer" label="Book Dryer" variant="primary" />
            <ActionLink href="/laundry/bookings" label="View My Bookings" variant="secondary" />
            <ActionLink href="/laundry/live" label="Live Machine Status" variant="secondary" />
            <ActionLink href="/laundry/rules" label="Laundry Rules / N.B." variant="secondary" />
          </div>
        </SoftCard>

        <SoftCard>
          <SectionTitle title="Laundry Credits" subtitle="Successful usage and missed slots update the same local demo credits used to enforce booking access." />
          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Current Credits</p>
            <p className="mt-2 text-4xl font-semibold text-slate-950">{credits.balance}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500">{credits.blockedUntil ? `Booking access blocked until ${new Date(credits.blockedUntil).toLocaleDateString()}.` : "Booking access is active right now."}</p>
          </div>
          <div className="mt-4 space-y-2 rounded-[24px] border border-gold-200 bg-gold-50 p-4 text-sm text-slate-700">
            <div className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-gold-700" /><p>Use the reserved machine within 15 minutes from the booking start time.</p></div>
            <div className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 text-gold-700" /><p>Each booking includes a 15-minute buffer before the next reservation.</p></div>
          </div>
        </SoftCard>
      </CardGrid>

      <SoftCard>
        <SectionTitle title="Important Rules" subtitle="These rules are shown clearly throughout the booking flow." />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {laundryRules.map((rule) => (
            <div key={rule} className="rounded-[22px] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">{rule}</div>
          ))}
        </div>
      </SoftCard>
    </div>
  );
}
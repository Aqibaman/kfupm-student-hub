"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageIntro, SoftCard, SectionTitle } from "@/components/hub";
import { getLaundryBookings, getLaundryCreditsStore, saveLaundryBooking } from "@/lib/demo-store";
import { laundryMachines, laundryRules, primaryStudent } from "@/lib/mock-data";
import { generateLaundrySlots, getLaundryDateOptions } from "@/lib/laundry";
import { LaundryMachineType } from "@/lib/types";

function formatDisplayDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export function LaundryBookingPage({ machineType }: { machineType: LaundryMachineType }) {
  const router = useRouter();
  const credits = getLaundryCreditsStore();
  const bookings = getLaundryBookings();
  const machines = laundryMachines.filter((machine) => machine.type === machineType && machine.state !== "Out of Service");
  const dates = getLaundryDateOptions();
  const [building, setBuilding] = useState(machines[0]?.building ?? "Dorm A");
  const [machineId, setMachineId] = useState(machines[0]?.id ?? "");
  const [date, setDate] = useState(dates[0]);
  const [selectedStartTime, setSelectedStartTime] = useState("");

  const visibleMachines = useMemo(() => machines.filter((machine) => machine.building === building), [building, machines]);
  const slots = useMemo(() => generateLaundrySlots(machineType, machineId, date, bookings, selectedStartTime), [bookings, date, machineId, machineType, selectedStartTime]);
  const selectedSlot = slots.find((slot) => slot.startTime === selectedStartTime);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSlot) return;
    if (credits.blockedUntil) return;

    const chosenMachine = machines.find((machine) => machine.id === machineId);
    if (!chosenMachine) return;

    saveLaundryBooking({
      id: `LB-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: primaryStudent.id,
      machineType,
      machineId,
      building: chosenMachine.building,
      room: chosenMachine.room,
      bookingDate: date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      checkInDeadline: selectedSlot.checkInDeadline,
      status: "Upcoming",
      usageResult: "Pending",
      creditsDelta: 0
    });

    router.push("/laundry/bookings");
  }

  return (
    <div className="space-y-6">
      <PageIntro title={`${machineType} Booking`} description={`Reserve a ${machineType.toLowerCase()} by building, machine, date, and available slot. Each reservation includes the required 15-minute buffer and 15-minute check-in rule.`} backHref="/laundry" />
      <SoftCard>
        <SectionTitle title="Booking Scheduler" subtitle="Select a date first, then choose a machine-specific slot from the scheduler grid." />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="label">Student</label>
              <div className="field bg-slate-50">{primaryStudent.name}</div>
            </div>
            <div>
              <label className="label">Machine Type</label>
              <div className="field bg-slate-50">{machineType}</div>
            </div>
            <div>
              <label className="label">Building / Laundry Room</label>
              <select className="field" value={building} onChange={(event) => { setBuilding(event.target.value); const nextMachine = machines.find((machine) => machine.building === event.target.value); setMachineId(nextMachine?.id ?? ""); setSelectedStartTime(""); }}>
                {Array.from(new Set(machines.map((machine) => machine.building))).map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Machine Selection</label>
              <select className="field" value={machineId} onChange={(event) => { setMachineId(event.target.value); setSelectedStartTime(""); }}>
                {visibleMachines.map((machine) => <option key={machine.id} value={machine.id}>{machine.id} - {machine.room}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionTitle title="Choose Date" subtitle="Select the booking date first, then choose from the visible machine-specific slots." />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {dates.map((day) => (
                  <button key={day} type="button" onClick={() => { setDate(day); setSelectedStartTime(""); }} className={day === date ? "primary-btn h-[72px] justify-start px-4 text-left" : "secondary-btn h-[72px] justify-start px-4 text-left"}>
                    <span className="flex flex-col items-start">
                      <span>{formatDisplayDate(day)}</span>
                      <span className="text-xs font-medium opacity-75">{day}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle title="Available Time Slots" subtitle="Available, reserved, unavailable, and selected states are separated clearly." />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {slots.map((slot) => {
                  const base = slot.availability === "reserved"
                    ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                    : slot.availability === "unavailable"
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
                      : slot.availability === "selected"
                        ? "border-brand-400 bg-brand-600 text-white shadow-[0_18px_30px_rgba(0,133,64,0.2)]"
                        : "border-brand-100 bg-white text-slate-800 hover:border-brand-300 hover:bg-brand-50";

                  return (
                    <button key={slot.startTime} type="button" disabled={slot.availability === "reserved" || slot.availability === "unavailable" || Boolean(credits.blockedUntil)} onClick={() => setSelectedStartTime(slot.startTime)} className={`rounded-[22px] border p-4 text-left transition ${base}`}>
                      <p className="text-sm font-semibold">{slot.startTime} to {slot.endTime}</p>
                      <p className="mt-2 text-xs">Check in by {slot.checkInDeadline}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em]">{slot.availability === "reserved" ? "Reserved" : slot.availability === "unavailable" ? "Unavailable" : slot.availability === "selected" ? "Selected" : "Available"}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <SoftCard className="bg-brand-50/50">
              <SectionTitle title="N.B. / Important Rules" subtitle="These rules apply to both washers and dryers." />
              <div className="space-y-2 text-sm leading-6 text-slate-600">
                {laundryRules.map((rule) => <p key={rule}>{rule}</p>)}
              </div>
            </SoftCard>
            <SoftCard>
              <SectionTitle title="Booking Summary" subtitle="Review the selected machine and slot before reserving." />
              <div className="space-y-3 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Machine:</span> {machineId || "Choose a machine"}</p>
                <p><span className="font-semibold text-slate-900">Date:</span> {date}</p>
                <p><span className="font-semibold text-slate-900">Selected slot:</span> {selectedSlot ? `${selectedSlot.startTime} to ${selectedSlot.endTime}` : "No slot selected"}</p>
                <p><span className="font-semibold text-slate-900">Check-in deadline:</span> {selectedSlot?.checkInDeadline ?? "--"}</p>
                <p><span className="font-semibold text-slate-900">Current credits:</span> {credits.balance}</p>
                {credits.blockedUntil ? <p className="font-semibold text-red-600">Laundry booking is blocked until {new Date(credits.blockedUntil).toLocaleDateString()}.</p> : null}
              </div>
            </SoftCard>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="primary-btn" disabled={!selectedSlot || Boolean(credits.blockedUntil)}>Reserve Now</button>
            <button type="button" className="secondary-btn" onClick={() => router.push("/laundry")}>Cancel</button>
          </div>
        </form>
      </SoftCard>
    </div>
  );
}
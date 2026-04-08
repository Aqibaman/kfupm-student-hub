"use client";

import { useMemo, useState } from "react";
import { ActionLink, PageIntro, SoftCard, SectionTitle } from "@/components/hub";
import { cancelLaundryBooking, checkInLaundryBooking, getLaundryBookings } from "@/lib/demo-store";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(() => getLaundryBookings());
  const activeBookings = useMemo(() => bookings.filter((booking) => booking.status === "Upcoming" || booking.status === "Checked In" || booking.status === "In Use"), [bookings]);
  const upcomingBookings = useMemo(() => activeBookings.filter((booking) => booking.status === "Upcoming"), [activeBookings]);
  const activeUseBookings = useMemo(() => activeBookings.filter((booking) => booking.status === "Checked In" || booking.status === "In Use"), [activeBookings]);

  function refresh() {
    setBookings(getLaundryBookings());
  }

  function BookingCard({ booking }: { booking: (typeof activeBookings)[number] }) {
    return (
      <SoftCard>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div><p className="text-sm text-slate-500">Machine Type / Number</p><p className="mt-1 font-semibold">{booking.machineType} - {booking.machineId}</p></div>
          <div><p className="text-sm text-slate-500">Building</p><p className="mt-1 font-semibold">{booking.building} - {booking.room}</p></div>
          <div><p className="text-sm text-slate-500">Date</p><p className="mt-1 font-semibold">{booking.bookingDate}</p></div>
          <div><p className="text-sm text-slate-500">Start / End</p><p className="mt-1 font-semibold">{booking.startTime} - {booking.endTime}</p></div>
          <div><p className="text-sm text-slate-500">Check-in Deadline</p><p className="mt-1 font-semibold">{booking.checkInDeadline}</p></div>
          <div><p className="text-sm text-slate-500">Status</p><p className="mt-1 font-semibold">{booking.status}</p></div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className="primary-btn" type="button" onClick={() => { checkInLaundryBooking(booking.id); refresh(); }}>Check In</button>
          <button className="ghost-btn" type="button" onClick={() => { cancelLaundryBooking(booking.id); refresh(); }}>Cancel Booking</button>
        </div>
      </SoftCard>
    );
  }

  return (
    <div className="space-y-6">
      <PageIntro title="My Bookings" description="Review active and upcoming reservations, check in within the allowed 15-minute window, or cancel before the slot is missed." backHref="/laundry" />

      <div className="space-y-6">
        <section className="space-y-4">
          <SectionTitle title="Upcoming Bookings" subtitle="These bookings are waiting for the check-in window to start." />
          {upcomingBookings.length ? upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />) : <SoftCard>No upcoming bookings right now.</SoftCard>}
        </section>

        <section className="space-y-4">
          <SectionTitle title="Active Use / Checked In" subtitle="Use the machine within the permitted window after check-in." />
          {activeUseBookings.length ? activeUseBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />) : <SoftCard>No checked-in bookings right now.</SoftCard>}
        </section>
      </div>

      <ActionLink href="/laundry" label="Back to Laundry" variant="secondary" />
    </div>
  );
}
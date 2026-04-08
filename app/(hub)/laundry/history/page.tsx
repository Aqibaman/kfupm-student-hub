"use client";

import { PageIntro, SoftCard } from "@/components/hub";
import { getLaundryBookings } from "@/lib/demo-store";

export default function LaundryHistoryPage() {
  const bookings = getLaundryBookings().filter(
    (booking) =>
      booking.status === "Completed" ||
      booking.status === "Missed" ||
      booking.status === "Cancelled"
  );

  return (
    <div className="space-y-6">
      <PageIntro
        title="Laundry History"
        description="Review successful, missed, and cancelled reservations with clear labels for usage result and credit impact."
        backHref="/laundry"
      />

      <div className="space-y-4">
        {bookings.map((booking) => (
          <SoftCard key={booking.id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-950">
                  {booking.machineType} {booking.machineId}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {booking.building} | {booking.room} | {booking.bookingDate} |{" "}
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-brand-700">
                  {booking.usageResult}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Credits{" "}
                  {booking.creditsDelta >= 0
                    ? `+${booking.creditsDelta}`
                    : booking.creditsDelta}
                </p>
              </div>
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}


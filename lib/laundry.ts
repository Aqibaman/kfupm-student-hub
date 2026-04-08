import { LaundryBooking, LaundryMachine, LaundryMachineType } from "@/lib/types";

const slotTemplates = {
  Washer: ["08:00", "09:15", "10:30", "11:45", "14:00", "15:15", "16:30", "17:45", "19:00"],
  Dryer: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]
} as const;

const usageMinutes = {
  Washer: 60,
  Dryer: 45
} as const;

export type LaundrySlot = {
  startTime: string;
  endTime: string;
  checkInDeadline: string;
  availability: "available" | "reserved" | "unavailable" | "selected";
};

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTimeString(totalMinutes: number) {
  const safe = Math.max(totalMinutes, 0);
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function getLaundryDateOptions() {
  const today = new Date();

  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(today);
    next.setDate(today.getDate() + index);
    return next.toISOString().slice(0, 10);
  });
}

export function generateLaundrySlots(
  machineType: LaundryMachineType,
  machineId: string,
  bookingDate: string,
  bookings: LaundryBooking[],
  selectedStartTime?: string
): LaundrySlot[] {
  const reservedStarts = new Set(
    bookings
      .filter((booking) => booking.machineId === machineId && booking.bookingDate === bookingDate && booking.status !== "Cancelled")
      .map((booking) => booking.startTime)
  );

  return slotTemplates[machineType].map((startTime) => {
    const startMinutes = toMinutes(startTime);
    const endTime = toTimeString(startMinutes + usageMinutes[machineType]);
    const checkInDeadline = toTimeString(startMinutes + 15);

    let availability: LaundrySlot["availability"] = reservedStarts.has(startTime) ? "reserved" : "available";
    if (selectedStartTime === startTime && availability === "available") availability = "selected";

    return {
      startTime,
      endTime,
      checkInDeadline,
      availability
    };
  });
}

export function getLaundryOverviewStats(machines: LaundryMachine[], bookings: LaundryBooking[]) {
  const washersAvailable = machines.filter((machine) => machine.type === "Washer" && machine.state === "Available").length;
  const dryersAvailable = machines.filter((machine) => machine.type === "Dryer" && machine.state === "Available").length;
  const occupiedMachines = machines.filter((machine) => machine.state === "Reserved" || machine.state === "In Use").length;
  const nextUpcomingBooking = bookings.find((booking) => booking.status === "Upcoming" || booking.status === "Checked In");

  return {
    washersAvailable,
    dryersAvailable,
    occupiedMachines,
    nextFreeSlot: machines.find((machine) => machine.state === "Available")?.nextFreeTime ?? "Today",
    nextUpcomingBooking
  };
}

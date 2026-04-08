"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BusFront, MapPinned, Radio, Route } from "lucide-react";
import { CardGrid, SectionTitle, SoftCard } from "@/components/hub";

type Point = { x: number; y: number };
type Stop = { id: string; label: string; point: Point; eta: string };
type BusState = "Running" | "Approaching Stop" | "Boarding";
type BusModel = {
  id: string;
  label: string;
  progress: number;
  speed: number;
  status: BusState;
  occupancy: string;
  pausedUntil?: number | null;
  stopId?: string | null;
  lastPausedStopId?: string | null;
  lastPausedProgress?: number | null;
};

const routeStops: Stop[] = [
  { id: "301", label: "301", point: { x: 56.9, y: 39.9 }, eta: "3 min" },
  { id: "302", label: "302", point: { x: 48.1, y: 43.2 }, eta: "4 min" },
  { id: "303", label: "303", point: { x: 36.9, y: 46.8 }, eta: "6 min" },
  { id: "304", label: "304", point: { x: 17.4, y: 54.2 }, eta: "8 min" },
  { id: "305", label: "305", point: { x: 28.7, y: 61.4 }, eta: "10 min" },
  { id: "306", label: "306", point: { x: 40.2, y: 75.4 }, eta: "12 min" },
  { id: "311", label: "311", point: { x: 53.0, y: 82.6 }, eta: "15 min" },
  { id: "313", label: "313", point: { x: 68.4, y: 90.3 }, eta: "18 min" }
];

const outboundPath: Point[] = [
  { x: 56.6, y: 39.5 },
  { x: 53.9, y: 40.4 },
  { x: 51.0, y: 41.3 },
  { x: 48.2, y: 42.1 },
  { x: 45.2, y: 43.0 },
  { x: 42.2, y: 43.9 },
  { x: 39.0, y: 44.8 },
  { x: 35.8, y: 45.8 },
  { x: 32.6, y: 46.8 },
  { x: 29.4, y: 47.9 },
  { x: 26.0, y: 48.9 },
  { x: 22.5, y: 50.0 },
  { x: 18.8, y: 51.2 },
  { x: 17.1, y: 53.3 },
  { x: 17.5, y: 56.0 },
  { x: 18.8, y: 58.2 },
  { x: 21.8, y: 59.3 },
  { x: 25.2, y: 60.2 },
  { x: 28.0, y: 61.0 },
  { x: 29.5, y: 63.2 },
  { x: 29.8, y: 66.0 },
  { x: 30.0, y: 68.9 },
  { x: 31.5, y: 71.3 },
  { x: 34.2, y: 72.9 },
  { x: 37.0, y: 74.0 },
  { x: 39.6, y: 75.2 },
  { x: 42.0, y: 76.4 },
  { x: 44.5, y: 77.9 },
  { x: 46.7, y: 79.6 },
  { x: 48.9, y: 81.2 },
  { x: 51.0, y: 82.8 },
  { x: 53.1, y: 84.4 },
  { x: 55.3, y: 86.1 },
  { x: 57.8, y: 87.6 },
  { x: 60.5, y: 88.9 },
  { x: 63.0, y: 90.0 }
];

const routePath: Point[] = [
  ...outboundPath,
  ...outboundPath.slice(1, -1).reverse()
];

const initialBuses: BusModel[] = [
  { id: "bus-01", label: "Bus 01", progress: 0.04, speed: 0.00155, status: "Approaching Stop", occupancy: "16 / 30", pausedUntil: null, stopId: null, lastPausedStopId: null, lastPausedProgress: null },
  { id: "bus-02", label: "Bus 04", progress: 0.19, speed: 0.00145, status: "Running", occupancy: "12 / 30", pausedUntil: null, stopId: null, lastPausedStopId: null, lastPausedProgress: null },
  { id: "bus-03", label: "Bus 06", progress: 0.37, speed: 0.0015, status: "Running", occupancy: "22 / 30", pausedUntil: null, stopId: null, lastPausedStopId: null, lastPausedProgress: null },
  { id: "bus-04", label: "Bus 09", progress: 0.56, speed: 0.00135, status: "Boarding", occupancy: "8 / 30", pausedUntil: Date.now() + 12000, stopId: "306", lastPausedStopId: "306", lastPausedProgress: 0.56 },
  { id: "bus-05", label: "Bus 12", progress: 0.74, speed: 0.0015, status: "Running", occupancy: "19 / 30", pausedUntil: null, stopId: null, lastPausedStopId: null, lastPausedProgress: null },
  { id: "bus-06", label: "Bus 15", progress: 0.9, speed: 0.0014, status: "Running", occupancy: "14 / 30", pausedUntil: null, stopId: null, lastPausedStopId: null, lastPausedProgress: null }
];

function getPointOnPath(path: Point[], progress: number) {
  const segments = path.slice(0, -1).map((point, index) => {
    const next = path[index + 1];
    const distance = Math.hypot(next.x - point.x, next.y - point.y);
    return { start: point, end: next, distance };
  });

  const totalDistance = segments.reduce((sum, segment) => sum + segment.distance, 0);
  let remaining = progress * totalDistance;

  for (const segment of segments) {
    if (remaining <= segment.distance) {
      const ratio = segment.distance === 0 ? 0 : remaining / segment.distance;
      return {
        x: segment.start.x + (segment.end.x - segment.start.x) * ratio,
        y: segment.start.y + (segment.end.y - segment.start.y) * ratio
      };
    }
    remaining -= segment.distance;
  }

  return path[path.length - 1];
}

function statusTone(status: BusState) {
  if (status === "Approaching Stop") return "bg-gold-500 text-slate-950";
  if (status === "Boarding") return "bg-sky-600 text-white";
  return "bg-brand-700 text-white";
}

function getNearestStop(point: Point) {
  return routeStops.reduce(
    (closest, stop) => {
      const distance = Math.hypot(stop.point.x - point.x, stop.point.y - point.y);
      return distance < closest.distance ? { stop, distance } : closest;
    },
    { stop: routeStops[0], distance: Number.POSITIVE_INFINITY }
  );
}

export function BusServicesMap() {
  const [buses, setBuses] = useState<BusModel[]>(initialBuses);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = Date.now();

      setBuses((current) =>
        current.map((bus) => {
          if (bus.pausedUntil && now < bus.pausedUntil) {
            return {
              ...bus,
              status: "Boarding"
            };
          }

          const resumedBus =
            bus.pausedUntil && now >= bus.pausedUntil
              ? {
                  ...bus,
                  pausedUntil: null,
                  stopId: null,
                  status: "Running"
                }
              : bus;

          const nextProgress = (resumedBus.progress + resumedBus.speed) % 1;
          const nextPoint = getPointOnPath(routePath, nextProgress);
          const nearest = getNearestStop(nextPoint);
          const canPauseAtThisStop =
            nearest.distance < 1.1 &&
            !(
              resumedBus.lastPausedStopId === nearest.stop.id &&
              resumedBus.lastPausedProgress !== null &&
              Math.abs(nextProgress - resumedBus.lastPausedProgress) < 0.08
            );

          if (canPauseAtThisStop) {
            return {
              ...resumedBus,
              progress: nextProgress,
              status: "Boarding",
              pausedUntil: now + 20000,
              stopId: nearest.stop.id,
              lastPausedStopId: nearest.stop.id,
              lastPausedProgress: nextProgress
            };
          }

          return {
            ...resumedBus,
            progress: nextProgress,
            status: nearest.distance < 2.2 ? "Approaching Stop" : "Running"
          };
        })
      );
    }, 90);

    return () => window.clearInterval(timer);
  }, []);

  const liveBuses = useMemo(
    () => buses.map((bus) => ({ ...bus, point: getPointOnPath(routePath, bus.progress) })),
    [buses]
  );

  return (
    <div className="space-y-6">
      <CardGrid cols="md:grid-cols-2 xl:grid-cols-4">
        <SoftCard>
          <p className="text-sm text-slate-500">Live GPS Feed</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Radio className="h-5 w-5" /></div>
            <p className="text-3xl font-semibold text-slate-950">Online</p>
          </div>
          <p className="mt-3 text-sm text-slate-500">Demo live tracking overlay on the provided KFUPM route sheet, with 20-second waiting time at every stop.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Active Buses</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><BusFront className="h-5 w-5" /></div>
            <p className="text-3xl font-semibold text-slate-950">{liveBuses.length}</p>
          </div>
          <p className="mt-3 text-sm text-slate-500">Buses are spaced in a realistic service pattern with roughly 5 to 10 minutes between arrivals.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Tracked Stops</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><MapPinned className="h-5 w-5" /></div>
            <p className="text-3xl font-semibold text-slate-950">{routeStops.length}</p>
          </div>
          <p className="mt-3 text-sm text-slate-500">Student waiting stations 301, 302, 303, 304, 305, 306, 311, and 313.</p>
        </SoftCard>
        <SoftCard>
          <p className="text-sm text-slate-500">Route Span</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><Route className="h-5 w-5" /></div>
            <p className="text-3xl font-semibold text-slate-950">Male Route</p>
          </div>
          <p className="mt-3 text-sm text-slate-500">Animated directly on the official route image you provided for the service page.</p>
        </SoftCard>
      </CardGrid>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <SoftCard className="overflow-hidden">
          <SectionTitle title="Live Bus Route Map" subtitle="This view uses the provided KFUPM route map with station overlays and moving buses on the same route line." />

          <div className="relative overflow-hidden rounded-[28px] border border-brand-100 bg-white">
            <div className="relative aspect-[1312/1893] w-full">
              <Image src="/bus-route-map.png" alt="KFUPM bus route map" fill className="object-contain" priority />

              <div className="absolute left-[2.1%] top-[1.7%] z-10 flex h-[8.5%] w-[26.5%] flex-col justify-center rounded-[2px] bg-[#0f746b] px-[3.5%]">
                <p className="text-[0.92vw] font-semibold uppercase tracking-[0.26em] text-[#85d5db] lg:text-[0.62rem]">
                  Live Route Overlay
                </p>
                <p className="mt-[0.35vw] text-[2.05vw] font-semibold tracking-tight text-white lg:text-[1.28rem]">
                  KFUPM Transport
                </p>
                <p className="mt-[0.3vw] text-[1vw] font-semibold uppercase tracking-[0.25em] text-[#d7f4f6] lg:text-[0.7rem]">
                  Live Route Monitor
                </p>
              </div>

              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
                <polyline
                  fill="none"
                  stroke="#1d4ed8"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.55"
                  points={routePath.map((point) => `${point.x},${point.y}`).join(" ")}
                  strokeDasharray="1.4 1"
                />
              </svg>

              {routeStops.map((stop) => (
                <div
                  key={stop.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${stop.point.x}%`, top: `${stop.point.y}%` }}
                >
                  <div className="rounded-full border-2 border-white bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-[0_10px_24px_rgba(220,38,38,0.32)]">
                    {stop.label}
                  </div>
                </div>
              ))}

              {liveBuses.map((bus) => (
                <div
                  key={bus.id}
                  className="group absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${bus.point.x}%`, top: `${bus.point.y}%` }}
                >
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-sm" />
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-brand-700 text-white shadow-[0_12px_26px_rgba(0,133,64,0.3)] transition duration-200 group-hover:scale-110 group-hover:bg-brand-600">
                    <BusFront className="h-4.5 w-4.5" />
                  </div>
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 hidden w-44 -translate-x-1/2 rounded-[18px] border border-brand-100 bg-white/96 p-3 text-left shadow-xl group-hover:block">
                    <p className="text-sm font-semibold text-slate-950">{bus.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{bus.occupancy} onboard</p>
                    {bus.stopId ? <p className="mt-1 text-xs font-medium text-sky-700">Waiting at station {bus.stopId}</p> : null}
                    <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusTone(bus.status)}`}>{bus.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SoftCard>

        <div className="space-y-6">
          <SoftCard>
            <SectionTitle title="Running Buses" subtitle="Current buses visible on the route image." />
            <div className="space-y-3">
              {liveBuses.map((bus) => (
                <div key={bus.id} className="rounded-[22px] border border-slate-200 bg-white/90 p-4 transition hover:border-brand-200 hover:bg-brand-50/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950">{bus.label}</p>
                      <p className="mt-1 text-sm text-slate-500">Current occupancy {bus.occupancy}</p>
                      <p className="mt-1 text-sm text-slate-500">{bus.stopId ? `Currently waiting at station ${bus.stopId}` : "Moving between stations"}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone(bus.status)}`}>
                      {bus.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">Estimated spacing from the next bus: {bus.id === "bus-01" ? "5 min" : bus.id === "bus-02" ? "6 min" : bus.id === "bus-03" ? "7 min" : bus.id === "bus-04" ? "8 min" : bus.id === "bus-05" ? "9 min" : "10 min"}</p>
                </div>
              ))}
            </div>
          </SoftCard>

          <SoftCard>
            <SectionTitle title="Bus Stop Sequence" subtitle="Stops overlaid directly on the official route map." />
            <div className="flex flex-wrap gap-2">
              {routeStops.map((stop) => (
                <div key={stop.id} className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                  Station {stop.label} - {stop.eta}
                </div>
              ))}
            </div>
          </SoftCard>

          <SoftCard>
            <SectionTitle title="Integration Note" subtitle="This can later connect to actual tracker hardware." />
            <div className="space-y-3 text-sm leading-6 text-slate-600">
              <p>The route sheet shown here is the real image you provided, with a live demo overlay for stops and moving buses.</p>
              <p>When actual GPS trackers are added to KFUPM buses, these markers can be updated from live location feeds instead of simulated motion.</p>
            </div>
          </SoftCard>
        </div>
      </div>
    </div>
  );
}

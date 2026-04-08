import { Ambulance, Check, CheckCircle2, MapPin, Truck } from "lucide-react";
import { emergencyStages, getStageStateForStep } from "@/lib/emergency";
import { EmergencyStage } from "@/lib/types";

const stageIcons = {
  "Request Received": Check,
  "Help Assigned": Ambulance,
  "On the Way": Truck,
  "On Site": MapPin,
  Complete: CheckCircle2
} as const;

export function EmergencyTimeline({ currentStage }: { currentStage: EmergencyStage }) {
  return (
    <div className="rounded-[30px] border border-brand-100/70 bg-[radial-gradient(circle_at_top_left,_rgba(107,255,205,0.16),_transparent_22%),radial-gradient(circle_at_top,_rgba(255,214,102,0.14),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f7faf9_100%)] p-4 shadow-[0_24px_50px_rgba(15,66,55,0.08)] sm:p-5">
      <div className="space-y-3 md:hidden">
        {emergencyStages.map((step, index) => {
          const state = getStageStateForStep(currentStage, step);
          const Icon = stageIcons[step];
          const iconWrapClass =
            state === "Complete"
              ? "bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-[0_0_28px_rgba(0,133,64,0.28)]"
              : state === "In Progress"
                ? "bg-gradient-to-br from-gold-400 to-amber-500 text-white shadow-[0_0_28px_rgba(245,158,11,0.28)]"
                : "bg-gradient-to-br from-slate-300 to-slate-200 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]";
          const titleClass =
            state === "Complete" ? "text-slate-950" : state === "In Progress" ? "text-slate-950" : "text-slate-700";
          const labelClass =
            state === "Complete"
              ? "text-brand-700"
              : state === "In Progress"
                ? "text-gold-700"
                : "text-slate-500";
          const connectorClass =
            state === "Complete"
              ? "bg-gradient-to-r from-brand-600 via-emerald-400 to-brand-200"
              : state === "In Progress"
                ? "bg-gradient-to-r from-gold-500 via-amber-300 to-slate-300"
                : "bg-slate-300";
          const panelGlow =
            state === "Complete"
              ? "shadow-[0_0_0_1px_rgba(0,133,64,0.08),0_14px_28px_rgba(0,133,64,0.1)]"
              : state === "In Progress"
                ? "shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_14px_28px_rgba(245,158,11,0.12)]"
                : "";

          return (
            <div key={`mobile-${step}`} className={`relative rounded-[22px] px-4 py-4 ${panelGlow}`}>
              {index < emergencyStages.length - 1 ? (
                <div className="absolute bottom-[-12px] left-8 top-[58px] w-1 rounded-full bg-slate-300">
                  <div className={`absolute inset-x-0 top-0 rounded-full ${connectorClass}`} style={{ height: state === "In Progress" ? "55%" : "100%" }} />
                </div>
              ) : null}
              <div className="flex items-start gap-4">
                <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconWrapClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className={`text-base font-semibold leading-6 ${titleClass}`}>
                    {index + 1}. {step}
                  </p>
                  <p className={`mt-1 text-sm font-medium ${labelClass}`}>{state}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:grid md:grid-cols-5 md:gap-3">
        {emergencyStages.map((step, index) => {
          const state = getStageStateForStep(currentStage, step);
          const Icon = stageIcons[step];
          const iconWrapClass =
            state === "Complete"
              ? "bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-[0_0_28px_rgba(0,133,64,0.28)]"
              : state === "In Progress"
                ? "bg-gradient-to-br from-gold-400 to-amber-500 text-white shadow-[0_0_28px_rgba(245,158,11,0.28)]"
                : "bg-gradient-to-br from-slate-300 to-slate-200 text-slate-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]";
          const titleClass =
            state === "Complete" ? "text-slate-950" : state === "In Progress" ? "text-slate-950" : "text-slate-700";
          const labelClass =
            state === "Complete"
              ? "text-brand-700"
              : state === "In Progress"
                ? "text-gold-700"
                : "text-slate-500";
          const connectorClass =
            state === "Complete"
              ? "bg-gradient-to-r from-brand-600 via-emerald-400 to-brand-200"
              : state === "In Progress"
                ? "bg-gradient-to-r from-gold-500 via-amber-300 to-slate-300"
                : "bg-slate-300";
          const panelGlow =
            state === "Complete"
              ? "shadow-[0_0_0_1px_rgba(0,133,64,0.08),0_14px_28px_rgba(0,133,64,0.1)]"
              : state === "In Progress"
                ? "shadow-[0_0_0_1px_rgba(245,158,11,0.12),0_14px_28px_rgba(245,158,11,0.12)]"
                : "";

          return (
            <div key={`desktop-${step}`} className={`relative flex flex-col items-center rounded-[24px] px-2 py-3 text-center ${panelGlow}`}>
              <div className="relative flex h-16 w-full items-center justify-center">
                {index < emergencyStages.length - 1 ? (
                  <div className="absolute left-[58%] right-[-10%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-300">
                    <div className={`absolute inset-y-0 left-0 rounded-full ${connectorClass}`} style={{ width: state === "In Progress" ? "55%" : "100%" }} />
                    <span
                      className={`absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${
                        state === "Complete" ? "bg-brand-300" : state === "In Progress" ? "bg-gold-300" : "bg-white"
                      }`}
                    />
                  </div>
                ) : null}
                <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${iconWrapClass}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-2 flex min-h-[74px] flex-col items-center justify-start">
                <p className={`text-[1.05rem] font-semibold leading-6 ${titleClass}`}>{index + 1}. {step}</p>
                <p className={`mt-1 text-base font-medium ${labelClass}`}>{state}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

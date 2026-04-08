import { EmergencyStage, EmergencyStatusState } from "@/lib/types";

export const emergencyStages: EmergencyStage[] = [
  "Request Received",
  "Help Assigned",
  "On the Way",
  "On Site",
  "Complete"
];

export function getEmergencyStatusState(stage: EmergencyStage): EmergencyStatusState {
  if (stage === "Complete") return "Complete";
  if (stage === "Request Received") return "Pending";
  return "In Progress";
}

export function getStageIndex(stage: EmergencyStage) {
  return emergencyStages.findIndex((item) => item === stage);
}

export function getStageStateForStep(currentStage: EmergencyStage, step: EmergencyStage): EmergencyStatusState {
  const currentIndex = getStageIndex(currentStage);
  const stepIndex = getStageIndex(step);

  if (stepIndex < currentIndex) return "Complete";
  if (stepIndex === currentIndex) return getEmergencyStatusState(currentStage);
  return "Pending";
}

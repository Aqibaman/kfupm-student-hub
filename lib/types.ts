export type NavItem = {
  title: string;
  href: string;
  description?: string;
  icon?: string;
};

export type ServiceItem = {
  title: string;
  href: string;
  description: string;
  tone: string;
};

export type RewardEntry = {
  label: string;
  points: number;
};

export type MedicalProfile = {
  bloodGroup: string;
  allergies: string;
  chronicDiseases: string;
  medications: string;
  notes: string;
};

export type EmergencyContactGroup = "roommate" | "friend";

export type EmergencyContact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  note?: string;
  group: EmergencyContactGroup;
};

export type EmergencySeverity = "Critical" | "Urgent" | "Moderate";

export type EmergencyStage =
  | "Request Received"
  | "Help Assigned"
  | "On the Way"
  | "On Site"
  | "Complete";

export type EmergencyStatusState = "Complete" | "In Progress" | "Pending";

export type EmergencyRequest = {
  id: string;
  studentName: string;
  emergencyType: string;
  symptoms: string;
  severity: EmergencySeverity;
  location: string;
  attachments: string[];
  medicalProfileSnapshot: MedicalProfile;
  emergencyContactsSnapshot: EmergencyContact[];
  stage: EmergencyStage;
  statusState: EmergencyStatusState;
  responderUnit: string;
  eta: string;
  destinationHospital: string;
  timeSubmitted: string;
  requestMode: "Instant Emergency Request" | "Manual Emergency Request";
};

export type LaundryMachineType = "Washer" | "Dryer";

export type LaundryMachineState = "Available" | "Reserved" | "In Use" | "Out of Service";

export type LaundryBookingStatus =
  | "Upcoming"
  | "Checked In"
  | "In Use"
  | "Completed"
  | "Missed"
  | "Cancelled";

export type LaundryUsageResult = "Successful" | "Missed" | "Cancelled" | "Pending";

export type LaundryMachine = {
  id: string;
  type: LaundryMachineType;
  building: string;
  room: string;
  state: LaundryMachineState;
  nextFreeTime: string;
};

export type LaundryBooking = {
  id: string;
  userId: string;
  machineType: LaundryMachineType;
  machineId: string;
  building: string;
  room: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  checkInDeadline: string;
  status: LaundryBookingStatus;
  usageResult: LaundryUsageResult;
  creditsDelta: number;
};

export type LaundryCredits = {
  balance: number;
  blockedUntil?: string | null;
  lastUpdated?: string | null;
};

export type MarketplaceListing = {
  id: string;
  title: string;
  price: number;
  seller: string;
  sellerEmail: string;
  sellerPhone: string;
  category: string;
  condition: string;
  description: string;
  location: string;
  listedOn: string;
  accent: string;
  imageLabel: string;
  photos?: number;
  sellerId?: string;
};

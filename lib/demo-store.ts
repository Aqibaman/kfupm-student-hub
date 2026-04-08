"use client";

import {
  emergencyContacts,
  emergencyRequests,
  initialLaundryCredits,
  laundryBookings,
  marketplaceListings,
  medicalProfile,
  rewardBreakdown,
  rewardsSummary
} from "@/lib/mock-data";
import { getEmergencyStatusState } from "@/lib/emergency";
import { EmergencyContact, EmergencyRequest, LaundryBooking, LaundryCredits, MarketplaceListing, MedicalProfile } from "@/lib/types";

const keys = {
  auth: "kfupm-auth",
  emergencyRequests: "kfupm-emergency-requests",
  medicalProfile: "kfupm-medical-profile",
  emergencyContacts: "kfupm-emergency-contacts",
  laundryBookings: "kfupm-laundry-bookings",
  laundryCredits: "kfupm-laundry-credits",
  rewards: "kfupm-rewards",
  marketplaceListings: "kfupm-marketplace-listings",
  marketplaceSaved: "kfupm-marketplace-saved"
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function setAuthStudent(name: string) {
  writeJson(keys.auth, { name, loggedIn: true });
}

export function getAuthStudent() {
  return readJson(keys.auth, { name: "Student", loggedIn: false });
}

export function getMedicalProfile() {
  return readJson<MedicalProfile>(keys.medicalProfile, medicalProfile);
}

export function saveMedicalProfile(profile: MedicalProfile) {
  writeJson(keys.medicalProfile, profile);
  return profile;
}

export function getEmergencyContactsStore() {
  return readJson<EmergencyContact[]>(keys.emergencyContacts, emergencyContacts);
}

export function saveEmergencyContactsStore(contacts: EmergencyContact[]) {
  writeJson(keys.emergencyContacts, contacts);
  return contacts;
}

export function getEmergencyRequests() {
  return readJson<EmergencyRequest[]>(keys.emergencyRequests, emergencyRequests);
}

export function saveEmergencyRequest(request: EmergencyRequest) {
  const updated = [request, ...getEmergencyRequests()];
  writeJson(keys.emergencyRequests, updated);
  awardPoints("Emergency request submitted", 25);
  return request;
}

export function getEmergencyRequestById(id?: string | null) {
  return getEmergencyRequests().find((request) => request.id === id) ?? getEmergencyRequests()[0] ?? null;
}

export function updateEmergencyRequest(id: string, updates: Partial<EmergencyRequest>) {
  const current = getEmergencyRequests();
  const updated = current.map((request) => {
    if (request.id !== id) return request;
    const nextStage = updates.stage ?? request.stage;
    return {
      ...request,
      ...updates,
      stage: nextStage,
      statusState: updates.statusState ?? getEmergencyStatusState(nextStage)
    };
  });
  writeJson(keys.emergencyRequests, updated);
  return updated.find((request) => request.id === id) ?? null;
}

export function getLaundryBookings() {
  return readJson<LaundryBooking[]>(keys.laundryBookings, laundryBookings);
}

export function saveLaundryBooking(booking: LaundryBooking) {
  const updated = [booking, ...getLaundryBookings()];
  writeJson(keys.laundryBookings, updated);
  return booking;
}

export function updateLaundryBooking(id: string, updates: Partial<LaundryBooking>) {
  const updated = getLaundryBookings().map((booking) => (booking.id === id ? { ...booking, ...updates } : booking));
  writeJson(keys.laundryBookings, updated);
  return updated.find((booking) => booking.id === id) ?? null;
}

export function cancelLaundryBooking(id: string) {
  return updateLaundryBooking(id, {
    status: "Cancelled",
    usageResult: "Cancelled",
    creditsDelta: 0
  });
}

export function checkInLaundryBooking(id: string) {
  return updateLaundryBooking(id, {
    status: "Checked In",
    usageResult: "Pending",
    creditsDelta: 0
  });
}

export function completeLaundryBooking(id: string) {
  const booking = updateLaundryBooking(id, {
    status: "Completed",
    usageResult: "Successful",
    creditsDelta: 5
  });

  if (booking) {
    applyLaundryCredits(5);
    awardPoints("Laundry slot used successfully", 5);
  }

  return booking;
}

export function missLaundryBooking(id: string) {
  const booking = updateLaundryBooking(id, {
    status: "Missed",
    usageResult: "Missed",
    creditsDelta: -10
  });

  if (booking) {
    applyLaundryCredits(-10);
  }

  return booking;
}

export function getLaundryCreditsStore() {
  const credits = readJson<LaundryCredits>(keys.laundryCredits, initialLaundryCredits);

  if (credits.blockedUntil) {
    const blockedUntil = new Date(credits.blockedUntil).getTime();
    if (Date.now() >= blockedUntil) {
      const restored = {
        balance: Math.max(10, credits.balance),
        blockedUntil: null,
        lastUpdated: new Date().toISOString()
      };
      writeJson(keys.laundryCredits, restored);
      return restored;
    }
  }

  return credits;
}

export function applyLaundryCredits(delta: number) {
  const current = getLaundryCreditsStore();
  let balance = Math.max(0, current.balance + delta);
  let blockedUntil = current.blockedUntil ?? null;

  if (balance === 0) {
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 7);
    blockedUntil = releaseDate.toISOString();
  }

  const updated = {
    balance,
    blockedUntil,
    lastUpdated: new Date().toISOString()
  };

  writeJson(keys.laundryCredits, updated);
  return updated;
}

export function getRewardsStore() {
  return readJson(keys.rewards, {
    totalPoints: rewardsSummary.totalPoints,
    badges: rewardsSummary.badges,
    rank: rewardsSummary.rank,
    activity: rewardBreakdown
  });
}

export function awardPoints(label: string, points: number) {
  const rewards = getRewardsStore();
  const updated = {
    ...rewards,
    totalPoints: rewards.totalPoints + points,
    activity: [{ label, points }, ...rewards.activity]
  };
  writeJson(keys.rewards, updated);
  return updated;
}

export function getMarketplaceListings() {
  return readJson<MarketplaceListing[]>(keys.marketplaceListings, marketplaceListings);
}

export function saveMarketplaceListing(listing: MarketplaceListing) {
  const updated = [listing, ...getMarketplaceListings()];
  writeJson(keys.marketplaceListings, updated);
  return listing;
}

export function getSavedMarketplaceIds() {
  return readJson<string[]>(keys.marketplaceSaved, []);
}

export function toggleSavedMarketplaceId(id: string) {
  const saved = getSavedMarketplaceIds();
  const updated = saved.includes(id) ? saved.filter((item) => item !== id) : [id, ...saved];
  writeJson(keys.marketplaceSaved, updated);
  return updated;
}

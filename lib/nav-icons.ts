import { BookOpenText, BusFront, Folder, Gift, LayoutDashboard, Medal, Search, Shirt, ShoppingBag, Siren, Users, UtensilsCrossed } from "lucide-react";

export const navIconMap = {
  "layout-dashboard": LayoutDashboard,
  siren: Siren,
  shirt: Shirt,
  "bus-front": BusFront,
  "shopping-bag": ShoppingBag,
  search: Search,
  users: Users,
  "book-open-text": BookOpenText,
  "utensils-crossed": UtensilsCrossed,
  folder: Folder,
  gift: Gift,
  medal: Medal
} as const;

export function getNavIconByTitle(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("dashboard")) return navIconMap["layout-dashboard"];
  if (normalized.includes("medical")) return navIconMap.siren;
  if (normalized.includes("laundry")) return navIconMap.shirt;
  if (normalized.includes("bus")) return navIconMap["bus-front"];
  if (normalized.includes("marketplace")) return navIconMap["shopping-bag"];
  if (normalized.includes("lost") || normalized.includes("found")) return navIconMap.search;
  if (normalized.includes("study groups") || normalized.includes("study-group")) return navIconMap.users;
  if (normalized.includes("course reviews") || normalized.includes("course review")) return navIconMap["book-open-text"];
  if (normalized.includes("food") || normalized.includes("cafeteria") || normalized.includes("menu")) return navIconMap["utensils-crossed"];
  if (normalized.includes("others")) return navIconMap.folder;
  if (normalized.includes("reward")) return navIconMap.gift;
  if (normalized.includes("leaderboard")) return navIconMap.medal;

  return undefined;
}

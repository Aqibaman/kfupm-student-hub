import { ModuleHome } from "@/components/module-pages";

export default function FoodHomePage() {
  return (
    <ModuleHome
      title="Campus Food"
      description="Check which cafeterias are open, browse menu highlights, and save your favorite meals or locations."
      actions={[
        { label: "View All Cafeterias", href: "/food/cafeterias" },
        { label: "Today’s Menu", href: "/food/menu", variant: "secondary" },
        { label: "Favorites", href: "/food/favorites", variant: "secondary" }
      ]}
      stats={[
        { label: "Open Cafeterias", value: "5", detail: "Central Dining Hall and Engineering Cafe are open now." },
        { label: "Today’s Menu Preview", value: "34 Items", detail: "Lunch and snack items refreshed for today." },
        { label: "Nearest Food Location", value: "Building 58", detail: "Engineering Cafe is a 4-minute walk away." }
      ]}
    />
  );
}

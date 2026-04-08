import { ListPanel } from "@/components/module-pages";
import { PageIntro } from "@/components/hub";

export default function FoodFavoritesPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Favorites" description="Review saved meals and cafeterias you want to revisit later." backHref="/food" />
      <ListPanel
        title="Saved Favorites"
        items={[
          { title: "Chicken Kabsa", meta: "Central Dining Hall", value: "SAR 18", description: "Popular lunch option." },
          { title: "Engineering Cafe", meta: "Building 58", value: "Open", description: "Quick walk from your afternoon classes." }
        ]}
      />
    </div>
  );
}

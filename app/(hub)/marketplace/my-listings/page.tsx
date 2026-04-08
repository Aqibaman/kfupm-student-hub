"use client";

import { useEffect, useState } from "react";
import { PageIntro } from "@/components/hub";
import { MarketplaceDetailsModal, MarketplaceGrid } from "@/components/marketplace-ui";
import { getMarketplaceListings, getSavedMarketplaceIds, toggleSavedMarketplaceId } from "@/lib/demo-store";
import { primaryStudent } from "@/lib/mock-data";
import { MarketplaceListing } from "@/lib/types";

export default function MyListingsPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [selected, setSelected] = useState<MarketplaceListing | null>(null);

  useEffect(() => {
    setSavedIds(getSavedMarketplaceIds());
    setListings(
      getMarketplaceListings().filter((listing) => listing.sellerEmail === primaryStudent.email || listing.sellerId === primaryStudent.id)
    );
  }, []);

  return (
    <div className="space-y-6">
      <PageIntro title="My Listings" description="Track the items you posted to the campus marketplace." backHref="/marketplace" />
      <MarketplaceGrid
        listings={listings}
        savedIds={savedIds}
        onOpen={setSelected}
        onToggleSaved={(id) => setSavedIds(toggleSavedMarketplaceId(id))}
        emptyMessage="You have not created any listings yet."
      />
      <MarketplaceDetailsModal
        listing={selected}
        isSaved={selected ? savedIds.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleSaved={(id) => setSavedIds(toggleSavedMarketplaceId(id))}
      />
    </div>
  );
}

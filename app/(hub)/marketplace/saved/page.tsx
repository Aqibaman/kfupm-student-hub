"use client";

import { useEffect, useState } from "react";
import { PageIntro } from "@/components/hub";
import { MarketplaceDetailsModal, MarketplaceGrid } from "@/components/marketplace-ui";
import { getMarketplaceListings, getSavedMarketplaceIds, toggleSavedMarketplaceId } from "@/lib/demo-store";
import { MarketplaceListing } from "@/lib/types";

export default function SavedItemsPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [selected, setSelected] = useState<MarketplaceListing | null>(null);

  useEffect(() => {
    setSavedIds(getSavedMarketplaceIds());
    setListings(getMarketplaceListings());
  }, []);
  const filteredListings = listings.filter((listing) => savedIds.includes(listing.id));

  function handleToggleSaved(id: string) {
    setSavedIds(toggleSavedMarketplaceId(id));
    if (selected?.id === id && savedIds.includes(id)) {
      setSelected(null);
    }
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Saved Items" description="Revisit the marketplace items you saved for later." backHref="/marketplace" />
      <MarketplaceGrid
        listings={filteredListings}
        savedIds={savedIds}
        onOpen={setSelected}
        onToggleSaved={handleToggleSaved}
        emptyMessage="You have not saved any listings yet."
      />
      <MarketplaceDetailsModal
        listing={selected}
        isSaved={selected ? savedIds.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleSaved={handleToggleSaved}
      />
    </div>
  );
}

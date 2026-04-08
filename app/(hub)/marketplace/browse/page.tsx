import { PageIntro, SoftCard } from "@/components/hub";
import { marketplaceListings } from "@/lib/mock-data";

export default function BrowseListingsPage() {
  return (
    <div className="space-y-6">
      <PageIntro title="Browse Listings" description="Browse item cards with price, seller, condition, and quick actions." backHref="/marketplace" />
      <div className="grid gap-4 md:grid-cols-2">
        {marketplaceListings.map((listing) => (
          <SoftCard key={listing.title}>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Listing</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">{listing.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{listing.price} • {listing.condition}</p>
            <p className="mt-1 text-sm text-slate-500">Seller: {listing.seller}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="primary-btn" type="button">View Details</button>
              <button className="secondary-btn" type="button">Save</button>
              <button className="secondary-btn" type="button">Contact Seller</button>
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}

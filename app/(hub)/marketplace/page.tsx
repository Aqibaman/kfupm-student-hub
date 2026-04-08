"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ImagePlus, X } from "lucide-react";
import { PageIntro, SoftCard } from "@/components/hub";
import { MarketplaceDetailsModal, MarketplaceGrid } from "@/components/marketplace-ui";
import { awardPoints, getMarketplaceListings, getSavedMarketplaceIds, saveMarketplaceListing, toggleSavedMarketplaceId } from "@/lib/demo-store";
import { primaryStudent } from "@/lib/mock-data";
import { MarketplaceListing } from "@/lib/types";

const categories = ["All", "Electronics", "Books", "Furniture", "Calculators", "Miscellaneous"];
const conditions = ["All Conditions", "New", "Like New", "Good", "Fair"];
const sortOptions = ["Newest First", "Price: Low to High", "Price: High to Low"];

export default function MarketplaceHomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All Conditions");
  const [sortBy, setSortBy] = useState("Newest First");
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Miscellaneous",
    price: "",
    condition: "Good",
    location: "",
    email: primaryStudent.email,
    phone: "",
    description: ""
  });

  useEffect(() => {
    setListings(getMarketplaceListings());
    setSavedIds(getSavedMarketplaceIds());
  }, []);

  const selectedListing = listings.find((listing) => listing.id === selectedId) ?? null;

  const filteredListings = useMemo(() => {
    const filtered = listings.filter((listing) => {
      const matchesQuery =
        query.trim() === "" ||
        [listing.title, listing.category, listing.description].some((value) =>
          value.toLowerCase().includes(query.trim().toLowerCase())
        );

      return (
        matchesQuery &&
        (category === "All" || listing.category === category) &&
        (condition === "All Conditions" || listing.condition === condition)
      );
    });

    const sorted = [...filtered];
    if (sortBy === "Price: Low to High") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => new Date(b.listedOn).getTime() - new Date(a.listedOn).getTime());
    return sorted;
  }, [category, condition, listings, query, sortBy]);

  function handleToggleSaved(id: string) {
    setSavedIds(toggleSavedMarketplaceId(id));
  }

  function handleCreateListing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newListing: MarketplaceListing = {
      id: `mk-${Math.floor(1000 + Math.random() * 9000)}`,
      title: form.title,
      price: Number(form.price),
      seller: primaryStudent.name,
      sellerEmail: form.email,
      sellerPhone: form.phone || "+966 55 000 0000",
      category: form.category,
      condition: form.condition,
      description: form.description,
      location: form.location,
      listedOn: new Date().toISOString().slice(0, 10),
      accent: "from-brand-400 via-brand-200 to-gold-200",
      imageLabel: form.category === "Books" ? "Book" : form.category === "Furniture" ? "Item" : "Listing",
      sellerId: primaryStudent.id
    };

    saveMarketplaceListing(newListing);
    setListings(getMarketplaceListings());
    awardPoints("Marketplace listing published", 20);
    setForm({
      title: "",
      category: "Miscellaneous",
      price: "",
      condition: "Good",
      location: "",
      email: primaryStudent.email,
      phone: "",
      description: ""
    });
    setShowCreateModal(false);
  }

  return (
    <div className="space-y-6">
      <PageIntro
        title="Marketplace"
        description="Browse student listings, save items for later, and publish your own ad through a cleaner campus marketplace experience."
        backHref="/dashboard"
      />

      <SoftCard className="overflow-hidden">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="block flex-1">
            <input
              className="field mt-0 h-12 px-4"
              placeholder="Search items..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <select className="field mt-0 w-full lg:w-40" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select className="field mt-0 w-full lg:w-48" value={condition} onChange={(event) => setCondition(event.target.value)}>
            {conditions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select className="field mt-0 w-full lg:w-44" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="primary-btn" onClick={() => setShowCreateModal(true)}>
            + Sell Item
          </button>
          <Link href="/marketplace/saved" className="secondary-btn">Saved Items</Link>
          <Link href="/marketplace/my-listings" className="secondary-btn">My Listings</Link>
        </div>
      </SoftCard>

      <MarketplaceGrid listings={filteredListings} savedIds={savedIds} onOpen={(listing) => setSelectedId(listing.id)} onToggleSaved={handleToggleSaved} />

      <MarketplaceDetailsModal
        listing={selectedListing}
        isSaved={selectedListing ? savedIds.includes(selectedListing.id) : false}
        onClose={() => setSelectedId(null)}
        onToggleSaved={handleToggleSaved}
      />

      {showCreateModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-6xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-slate-950">Create Listing</h2>
              <button type="button" onClick={() => setShowCreateModal(false)} className="ghost-btn h-11 w-11 rounded-full p-0">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="grid gap-4 lg:grid-cols-2">
              <input className="field mt-0" placeholder="Item title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <select className="field mt-0" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.filter((item) => item !== "All").map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              <input className="field mt-0" placeholder="Price (SAR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              <select className="field mt-0" value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
                {conditions.filter((item) => item !== "All Conditions").map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              <input className="field mt-0" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
              <input className="field mt-0" placeholder="Contact email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

              <input className="field mt-0" placeholder="Phone number (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-slate-500">
                <ImagePlus className="h-5 w-5" />
                Add photos (0/7)
              </label>

              <textarea
                className="field mt-0 min-h-32 lg:col-span-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />

              <div className="lg:col-span-2">
                <button type="submit" className="primary-btn">
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

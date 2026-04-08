"use client";

import { Heart, Mail, MapPin, Phone, ShoppingBag, X } from "lucide-react";
import clsx from "clsx";
import { MarketplaceListing } from "@/lib/types";

export function MarketplaceGrid({
  listings,
  savedIds,
  onOpen,
  onToggleSaved,
  emptyMessage = "No listings found."
}: {
  listings: MarketplaceListing[];
  savedIds: string[];
  onOpen: (listing: MarketplaceListing) => void;
  onToggleSaved: (id: string) => void;
  emptyMessage?: string;
}) {
  if (!listings.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {listings.map((listing) => {
        const isSaved = savedIds.includes(listing.id);

        return (
          <div
            key={listing.id}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(listing)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onOpen(listing);
              }
            }}
            className="overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
          >
            <div className={clsx("relative h-36 bg-gradient-to-br", listing.accent)}>
              <button
                type="button"
                aria-label={isSaved ? "Remove from saved" : "Save item"}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleSaved(listing.id);
                }}
                className={clsx(
                  "absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-sm transition",
                  isSaved ? "text-brand-700" : "text-slate-500"
                )}
              >
                <Heart className={clsx("h-5 w-5", isSaved ? "fill-current" : "")} />
              </button>
              {listing.photos ? (
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-slate-700">
                  {listing.photos} photos
                </span>
              ) : null}
              <div className="flex h-full items-center justify-center">
                <div className="rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700">{listing.imageLabel}</div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="space-y-2">
                <h3 className="line-clamp-2 text-[1.05rem] font-semibold leading-7 text-slate-950">{listing.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                    {listing.category}
                  </span>
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700">
                    {listing.condition}
                  </span>
                </div>
              </div>

              <p className="line-clamp-2 min-h-[2.75rem] text-sm leading-6 text-slate-600">{listing.description}</p>

              <div className="flex items-end justify-between gap-3">
                <p className="text-2xl font-semibold text-brand-700">SAR {listing.price}</p>
                <span className="text-sm font-medium text-petrol-700">View details →</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MarketplaceDetailsModal({
  listing,
  isSaved,
  onClose,
  onToggleSaved
}: {
  listing: MarketplaceListing | null;
  isSaved: boolean;
  onClose: () => void;
  onToggleSaved: (id: string) => void;
}) {
  if (!listing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className={clsx("relative h-72 bg-gradient-to-br", listing.accent)}>
          <button
            type="button"
            className={clsx("absolute left-4 top-4 rounded-full bg-white/90 p-2 shadow-sm", isSaved ? "text-brand-700" : "text-slate-500")}
            onClick={() => onToggleSaved(listing.id)}
            aria-label={isSaved ? "Remove from saved" : "Save item"}
          >
            <Heart className={clsx("h-5 w-5", isSaved ? "fill-current" : "")} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex h-full items-center justify-center">
            <div className="rounded-full bg-white/85 px-5 py-2.5 text-base font-semibold text-slate-700 shadow-sm">{listing.imageLabel}</div>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">{listing.title}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                  {listing.category}
                </span>
                <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  {listing.condition}
                </span>
              </div>
            </div>
            <p className="text-4xl font-semibold text-brand-700">SAR {listing.price}</p>
          </div>

          <p className="text-base leading-7 text-slate-600">{listing.description}</p>

          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" />
              {listing.location}
            </div>
            <div className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-brand-600" />
              Listed on {listing.listedOn}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-xl font-semibold text-slate-950">Contact Seller</h3>
            <div className="mt-4 space-y-3">
              <a href={`mailto:${listing.sellerEmail}`} className="secondary-btn flex w-full items-center justify-center gap-3 py-4 text-base">
                <Mail className="h-5 w-5" />
                {listing.sellerEmail}
              </a>
              <a href={`tel:${listing.sellerPhone}`} className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-700 px-4 py-4 text-base font-semibold text-white transition hover:bg-brand-800">
                <Phone className="h-5 w-5" />
                {listing.sellerPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Bath, BedDouble, Heart, MapPin, Star, Users, Waves, Wifi } from "lucide-react";

import { Button } from "@/components/Button";
import type { Villa } from "@/api/types";
import { formatCurrency } from "@/lib/format";

type VillaCardProps = {
  isSelected: boolean;
  onSelect: (villa: Villa) => void;
  villa: Villa;
};

export function VillaCard({ isSelected, onSelect, villa }: VillaCardProps) {
  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-subtle transition duration-180 ease-out hover:-translate-y-0.5 hover:shadow-card ${
        isSelected ? "border-primary-600" : "border-neutral-200"
      }`}
    >
      <div className="relative h-56 overflow-hidden bg-neutral-100">
        <img
          alt={`${villa.name} in ${villa.location}`}
          className="h-full w-full object-cover transition duration-240 ease-out group-hover:scale-[1.03]"
          src={villa.imageUrl}
        />
        <button
          aria-label={`Save ${villa.name}`}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ocean-900 shadow-subtle"
          type="button"
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-ocean-900">{villa.name}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
              <MapPin size={16} />
              {villa.location}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-ocean-900">
            <Star className="fill-warning text-warning" size={15} />
            {villa.rating?.toFixed(1)}
          </span>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-neutral-700">{villa.description}</p>
        <div className="mt-5 grid grid-cols-3 gap-2 text-sm text-neutral-700">
          <span className="inline-flex items-center gap-2">
            <Users size={16} /> {villa.capacity}
          </span>
          <span className="inline-flex items-center gap-2">
            <BedDouble size={16} /> {villa.numberOfBeds}
          </span>
          <span className="inline-flex items-center gap-2">
            <Bath size={16} /> {villa.numberOfBaths}
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            <Waves size={14} /> Beach
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            <Wifi size={14} /> Wifi
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <p className="text-xs font-medium text-neutral-500">From</p>
            <p className="text-xl font-bold text-primary-700">{formatCurrency(villa.pricePerNight)}</p>
            <p className="text-xs text-neutral-500">per night</p>
          </div>
          <Button onClick={() => onSelect(villa)} size="medium">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}

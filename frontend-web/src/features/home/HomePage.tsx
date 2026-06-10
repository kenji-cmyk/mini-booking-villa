import { CalendarCheck, CheckCircle2, Filter, Search, ShieldCheck, Sparkles, WalletCards, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { createBooking } from "@/api/bookings";
import { createPayment } from "@/api/payments";
import type { CreateBookingRequest, PaymentMethod, Villa, VillaSearchParams } from "@/api/types";
import { getVillas } from "@/api/villas";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { SkeletonCard } from "@/components/SkeletonCard";
import { StateBlock } from "@/components/StateBlock";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency, getErrorMessage, getNightCount } from "@/lib/format";
import { BookingSummary } from "@/features/home/components/BookingSummary";
import { Footer } from "@/features/home/components/Footer";
import { Header } from "@/features/home/components/Header";
import { VillaCard } from "@/features/home/components/VillaCard";

type BookingFormState = {
  contactName: string;
  contactPhone: string;
};

const initialSearch = {
  location: "",
  checkInDate: "2026-08-01",
  checkOutDate: "2026-08-03",
  guests: 2
};

export function HomePage() {
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState({ maxPrice: "", privatePool: false, beachAccess: true });
  const [selectedVilla, setSelectedVilla] = useState<Villa | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("VNPAY");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormState>({ contactName: "Demo Guest", contactPhone: "0900000001" });
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const villaParams = useMemo<VillaSearchParams>(
    () => ({
      keyword: search.location.trim() || undefined,
      capacity: search.guests > 0 ? search.guests : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      availableFrom: search.checkInDate || undefined,
      availableTo: search.checkOutDate || undefined
    }),
    [filters.maxPrice, search.checkInDate, search.checkOutDate, search.guests, search.location]
  );
  const loadVillas = useCallback(() => getVillas(villaParams), [villaParams]);
  const { data: villas, error, isLoading, refetch } = useAsync(loadVillas);

  const filteredVillas = useMemo(() => {
    return (villas ?? []).filter((villa) => {
      if (filters.privatePool && !villa.amenities?.some((item) => item.toLowerCase().includes("pool"))) {
        return false;
      }

      if (filters.beachAccess && !villa.amenities?.some((item) => item.toLowerCase().includes("beach"))) {
        return false;
      }

      return true;
    });
  }, [filters.beachAccess, filters.privatePool, villas]);

  const selectedOrFirstVilla = selectedVilla ?? filteredVillas[0] ?? null;

  const handleBook = async () => {
    const villa = selectedOrFirstVilla;
    setFormError(null);
    setSuccessMessage(null);

    if (!villa) {
      setFormError("Select a villa first.");
      return;
    }

    if (!bookingForm.contactName.trim() || !bookingForm.contactPhone.trim()) {
      setFormError("Contact name and phone are required.");
      return;
    }

    if (!search.checkInDate || !search.checkOutDate || search.checkOutDate <= search.checkInDate) {
      setFormError("Check-out must be later than check-in.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: CreateBookingRequest = {
        villaId: villa.id,
        checkInDate: search.checkInDate,
        checkOutDate: search.checkOutDate,
        numberOfGuests: search.guests,
        contactName: bookingForm.contactName,
        contactPhone: bookingForm.contactPhone
      };
      const booking = await createBooking(payload);
      await createPayment({
        bookingId: booking.id,
        provider: paymentMethod,
        transactionCode: `WEB-${paymentMethod}-${booking.id}`,
        successful: true
      });
      setSuccessMessage(`Booking #${booking.id} confirmed. Payment successful.`);
      setIsBookingOpen(false);
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to complete booking."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main id="top">
        <Hero search={search} setSearch={setSearch} />
        <TrustStrip />
        <section className="mx-auto grid max-w-[1280px] gap-6 px-4 py-20 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_340px] lg:px-8" id="villas">
          <FilterSidebar filters={filters} setFilters={setFilters} />

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Featured Villas</p>
                <h2 className="mt-2 text-3xl font-bold text-ocean-900">Curated stays for your next escape</h2>
              </div>
              <Button onClick={() => void refetch()} size="medium" variant="secondary">
                Refresh
              </Button>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : null}

            {!isLoading && error ? <StateBlock message={error} onRetry={refetch} title="Unable to load villas" /> : null}

            {!isLoading && !error && filteredVillas.length === 0 ? (
              <StateBlock message="Try another location, guest count, or price range." title="No villas found" />
            ) : null}

            {!isLoading && !error && filteredVillas.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredVillas.map((villa) => (
                  <VillaCard
                    isSelected={selectedOrFirstVilla?.id === villa.id}
                    key={villa.id}
                    onSelect={(villa) => {
                      setSelectedVilla(villa);
                      setIsBookingOpen(true);
                    }}
                    villa={villa}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <BookingSummary
            checkInDate={search.checkInDate}
            checkOutDate={search.checkOutDate}
            guests={search.guests}
            onBook={() => setIsBookingOpen(true)}
            paymentMethod={paymentMethod}
            selectedVilla={selectedOrFirstVilla}
            setPaymentMethod={setPaymentMethod}
          />
        </section>
        <HowItWorks />
      </main>
      <Footer />

      {isBookingOpen ? (
        <BookingModal
          bookingForm={bookingForm}
          error={formError}
          isSubmitting={isSubmitting}
          onClose={() => setIsBookingOpen(false)}
          onSubmit={() => void handleBook()}
          search={search}
          selectedVilla={selectedOrFirstVilla}
          setBookingForm={setBookingForm}
        />
      ) : null}

      {successMessage ? (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-success bg-white p-5 text-sm text-neutral-700 shadow-panel section-enter">
          <strong className="block text-success">Payment successful</strong>
          <span>{successMessage}</span>
        </div>
      ) : null}
    </>
  );
}

type SearchState = typeof initialSearch;

function Hero({ search, setSearch }: { search: SearchState; setSearch: (value: SearchState) => void }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8 lg:py-20">
        <div className="section-enter flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Coastal villa booking</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.08] text-ocean-900 md:text-[56px]">
            Find your calm, private villa escape.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-neutral-700">
            Browse trusted VStay villas, compare transparent pricing, and complete your booking with a simple secure flow.
          </p>
          <div className="mt-8 rounded-[20px] border border-neutral-200 bg-white p-5 shadow-panel">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto]">
              <Input
                label="Location"
                name="location"
                onChange={(event) => setSearch({ ...search, location: event.target.value })}
                placeholder="Da Nang, Da Lat..."
                type="search"
                value={search.location}
              />
              <Input
                label="Check-in"
                name="checkInDate"
                onChange={(event) => setSearch({ ...search, checkInDate: event.target.value })}
                type="date"
                value={search.checkInDate}
              />
              <Input
                label="Check-out"
                name="checkOutDate"
                onChange={(event) => setSearch({ ...search, checkOutDate: event.target.value })}
                type="date"
                value={search.checkOutDate}
              />
              <Input
                label="Guests"
                min={1}
                name="guests"
                onChange={(event) => setSearch({ ...search, guests: Number(event.target.value) || 1 })}
                type="number"
                value={search.guests}
              />
              <Button className="self-end" type="button">
                <Search className="mr-2" size={18} /> Search Villas
              </Button>
            </div>
          </div>
        </div>
        <div className="section-enter min-h-[420px] overflow-hidden rounded-[20px] shadow-panel">
          <img
            alt="Premium seaside villa with pool"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: CheckCircle2, title: "Verified villas", text: "Every stay is reviewed." },
    { icon: Sparkles, title: "Transparent pricing", text: "No surprise totals." },
    { icon: ShieldCheck, title: "Secure payment", text: "Protected checkout." },
    { icon: CalendarCheck, title: "Fast booking", text: "Confirm in minutes." }
  ];

  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-[1280px] gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-subtle" key={item.title}>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="font-semibold text-ocean-900">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FilterSidebar({
  filters,
  setFilters
}: {
  filters: { maxPrice: string; privatePool: boolean; beachAccess: boolean };
  setFilters: (value: { maxPrice: string; privatePool: boolean; beachAccess: boolean }) => void;
}) {
  return (
    <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-5 shadow-subtle">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-ocean-900">
          <Filter size={18} /> Filters
        </h2>
        <button
          className="text-sm font-semibold text-primary-700"
          onClick={() => setFilters({ maxPrice: "", privatePool: false, beachAccess: false })}
          type="button"
        >
          Clear all
        </button>
      </div>
      <div className="mt-5 grid gap-5">
        <Select
          label="Price range"
          onChange={(event) => setFilters({ ...filters, maxPrice: event.target.value })}
          value={filters.maxPrice}
        >
          <option value="">Any price</option>
          <option value="2000000">Up to 2,000,000 VND</option>
          <option value="2500000">Up to 2,500,000 VND</option>
          <option value="3500000">Up to 3,500,000 VND</option>
        </Select>
        {[
          ["beachAccess", "Beach access"],
          ["privatePool", "Private pool"]
        ].map(([key, label]) => (
          <label className="flex items-center justify-between gap-4 text-sm font-semibold text-neutral-700" key={key}>
            {label}
            <input
              checked={Boolean(filters[key as "beachAccess" | "privatePool"])}
              className="h-5 w-5 accent-primary-600"
              onChange={(event) => setFilters({ ...filters, [key]: event.target.checked })}
              type="checkbox"
            />
          </label>
        ))}
      </div>
    </aside>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Search, title: "Search", text: "Choose destination, dates, and guests." },
    { icon: CalendarCheck, title: "Book", text: "Select the villa and confirm your stay." },
    { icon: WalletCards, title: "Pay", text: "Use MoMo or VNPay in the secure flow." }
  ];

  return (
    <section className="bg-white py-20" id="how-it-works">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">How It Works</p>
          <h2 className="mt-2 text-3xl font-bold text-ocean-900">Three steps to your next stay</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6" key={step.title}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-ocean-900">{step.title}</h3>
                <p className="mt-2 text-base text-neutral-700">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BookingModal({
  bookingForm,
  error,
  isSubmitting,
  onClose,
  onSubmit,
  search,
  selectedVilla,
  setBookingForm
}: {
  bookingForm: BookingFormState;
  error: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
  search: SearchState;
  selectedVilla: Villa | null;
  setBookingForm: (value: BookingFormState) => void;
}) {
  const nights = getNightCount(search.checkInDate, search.checkOutDate);
  const total = selectedVilla ? selectedVilla.pricePerNight * nights : 0;

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-ocean-900/40 p-4 sm:place-items-center" role="dialog" aria-modal="true">
      <div className="section-enter w-full max-w-xl rounded-2xl bg-white p-6 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Secure checkout</p>
            <h2 className="mt-2 text-2xl font-bold text-ocean-900">{selectedVilla?.name ?? "Your stay"}</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {nights} nights · {formatCurrency(total)}
            </p>
          </div>
          <button
            aria-label="Close booking dialog"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-700"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          <Input
            error={!bookingForm.contactName.trim() && error ? "Contact name is required." : undefined}
            label="Contact name"
            onChange={(event) => setBookingForm({ ...bookingForm, contactName: event.target.value })}
            placeholder="Nguyen Van A"
            value={bookingForm.contactName}
          />
          <Input
            error={!bookingForm.contactPhone.trim() && error ? "Contact phone is required." : undefined}
            label="Contact phone"
            onChange={(event) => setBookingForm({ ...bookingForm, contactPhone: event.target.value })}
            placeholder="0901234567"
            value={bookingForm.contactPhone}
          />
          {error ? <p className="rounded-xl bg-error/10 p-3 text-sm text-error">{error}</p> : null}
          <Button isLoading={isSubmitting} onClick={onSubmit}>
            Complete booking
          </Button>
        </div>
      </div>
    </div>
  );
}

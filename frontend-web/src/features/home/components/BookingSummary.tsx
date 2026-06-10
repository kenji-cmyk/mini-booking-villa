import { CreditCard, ShieldCheck } from "lucide-react";

import { Button } from "@/components/Button";
import type { PaymentMethod, Villa } from "@/api/types";
import { formatCurrency, getNightCount } from "@/lib/format";

type BookingSummaryProps = {
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  onBook: () => void;
  paymentMethod: PaymentMethod;
  selectedVilla: Villa | null;
  setPaymentMethod: (method: PaymentMethod) => void;
};

export function BookingSummary({
  checkInDate,
  checkOutDate,
  guests,
  onBook,
  paymentMethod,
  selectedVilla,
  setPaymentMethod
}: BookingSummaryProps) {
  const nights = getNightCount(checkInDate, checkOutDate);
  const subtotal = selectedVilla ? selectedVilla.pricePerNight * nights : 0;
  const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + serviceFee;

  return (
    <aside className="sticky top-28 rounded-2xl border border-neutral-200 bg-white p-6 shadow-card" id="booking">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">Your Stay</p>
      <h3 className="mt-2 text-2xl font-bold text-ocean-900">{selectedVilla?.name ?? "Select a villa"}</h3>
      <p className="mt-2 text-sm text-neutral-500">{selectedVilla?.location ?? "Choose a stay to see pricing."}</p>

      <div className="mt-6 space-y-3 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700">
        <div className="flex justify-between">
          <span>Check-in</span>
          <strong>{checkInDate || "-"}</strong>
        </div>
        <div className="flex justify-between">
          <span>Check-out</span>
          <strong>{checkOutDate || "-"}</strong>
        </div>
        <div className="flex justify-between">
          <span>Guests</span>
          <strong>{guests}</strong>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <p className="text-sm font-semibold text-neutral-700">Payment method</p>
        <div className="grid grid-cols-2 gap-3">
          {(["VNPAY", "MOMO"] as PaymentMethod[]).map((method) => (
            <button
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition duration-180 ease-out ${
                paymentMethod === method
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:border-primary-600"
              }`}
              key={method}
              onClick={() => setPaymentMethod(method)}
              type="button"
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm text-neutral-700">
        <div className="flex justify-between">
          <span>
            {formatCurrency(selectedVilla?.pricePerNight ?? 0)} x {nights} nights
          </span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <strong>{formatCurrency(serviceFee)}</strong>
        </div>
        <div className="flex justify-between text-lg text-ocean-900">
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </div>

      <Button className="mt-6 w-full" disabled={!selectedVilla || nights === 0} onClick={onBook}>
        Secure checkout
      </Button>
      <p className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
        <ShieldCheck size={16} /> Protected booking with secure payment.
      </p>
      <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
        <CreditCard size={16} /> No formatted currency is sent to the API.
      </p>
    </aside>
  );
}

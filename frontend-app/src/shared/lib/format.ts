export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatGuests(capacity: number): string {
  return `${capacity} ${capacity === 1 ? "guest" : "guests"}`;
}

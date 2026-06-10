export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}

export function getNightCount(checkInDate: string, checkOutDate: string): number {
  if (!checkInDate || !checkOutDate) {
    return 0;
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diff = checkOut.getTime() - checkIn.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }

  return fallback;
}

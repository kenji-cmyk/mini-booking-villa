import { demoGuestCredentials } from "@/api/auth";
import { apiRequest } from "@/api/client";
import { mapBooking } from "@/api/mappers";
import type { Booking, CreateBookingRequest } from "@/api/types";

const demoGuestAuth = {
  type: "basic",
  credentials: demoGuestCredentials
} as const;

export async function createBooking(payload: CreateBookingRequest): Promise<Booking> {
  const booking = await apiRequest<unknown, CreateBookingRequest>("/api/bookings", {
    auth: demoGuestAuth,
    body: payload,
    method: "POST"
  });

  return mapBooking(booking as Booking);
}

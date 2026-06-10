import { createBooking as createBookingRequest } from "@/api/bookings";
import type { Booking, BookingRequest } from "@/features/booking/types/booking";

export function createBooking(body: BookingRequest): Promise<Booking> {
  return createBookingRequest(body);
}

import { apiRequest } from "@/api/client";
import { mapBooking, mapVilla } from "@/api/mappers";
import type { Booking, CreateVillaRequest, UpdateBookingStatusRequest, UpdateVillaRequest, Villa } from "@/api/types";

const adminAuth = {
  type: "basic",
  credentials: {
    username: "admin@vstay.local",
    password: "admin123"
  }
} as const;

export async function createVilla(payload: CreateVillaRequest): Promise<Villa> {
  const villa = await apiRequest<unknown, CreateVillaRequest>("/api/admin/villas", {
    auth: adminAuth,
    body: payload,
    method: "POST"
  });

  return mapVilla(villa as Villa);
}

export async function updateVilla(villaId: number | string, payload: UpdateVillaRequest): Promise<Villa> {
  const villa = await apiRequest<unknown, UpdateVillaRequest>(`/api/admin/villas/${villaId}`, {
    auth: adminAuth,
    body: payload,
    method: "PUT"
  });

  return mapVilla(villa as Villa);
}

export function deleteVilla(villaId: number | string): Promise<void> {
  return apiRequest<void>(`/api/admin/villas/${villaId}`, {
    auth: adminAuth,
    method: "DELETE"
  });
}

export async function getAllBookings(): Promise<Booking[]> {
  const bookings = await apiRequest<unknown[]>("/api/admin/bookings", {
    auth: adminAuth
  });

  return bookings.map((booking) => mapBooking(booking as Booking));
}

export async function getAdminBookingById(bookingId: number | string): Promise<Booking> {
  const booking = await apiRequest<unknown>(`/api/admin/bookings/${bookingId}`, {
    auth: adminAuth
  });

  return mapBooking(booking as Booking);
}

export async function updateBookingStatus(
  bookingId: number | string,
  payload: UpdateBookingStatusRequest
): Promise<Booking> {
  const booking = await apiRequest<unknown, UpdateBookingStatusRequest>(`/api/admin/bookings/${bookingId}/status`, {
    auth: adminAuth,
    body: payload,
    method: "PATCH"
  });

  return mapBooking(booking as Booking);
}

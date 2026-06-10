import type { Booking, Payment, Villa } from "@/api/types";

type BackendVilla = Partial<Villa> & {
  active?: boolean;
};

type BackendBooking = Partial<Booking> & {
  status?: Booking["bookingStatus"];
  totalPrice?: number;
};

type BackendPayment = Partial<Payment> & {
  provider?: Payment["method"];
  status?: Payment["paymentStatus"];
};

export function mapVilla(payload: BackendVilla): Villa {
  return {
    id: payload.id ?? "",
    name: payload.name ?? "Untitled villa",
    location: payload.location ?? "Unknown location",
    description: payload.description ?? "",
    pricePerNight: payload.pricePerNight ?? 0,
    capacity: payload.capacity ?? 0,
    available: payload.available ?? payload.active ?? true,
    imageUrl: payload.imageUrl,
    rating: payload.rating,
    numberOfBeds: payload.numberOfBeds,
    numberOfBaths: payload.numberOfBaths,
    amenities: payload.amenities
  };
}

export function mapBooking(payload: BackendBooking): Booking {
  return {
    id: payload.id ?? "",
    villaId: payload.villaId ?? "",
    villaName: payload.villaName,
    checkInDate: payload.checkInDate ?? "",
    checkOutDate: payload.checkOutDate ?? "",
    numberOfGuests: payload.numberOfGuests ?? 0,
    contactName: payload.contactName ?? "",
    contactPhone: payload.contactPhone ?? "",
    bookingStatus: payload.bookingStatus ?? payload.status ?? "PENDING",
    totalAmount: payload.totalAmount ?? payload.totalPrice,
    createdAt: payload.createdAt
  };
}

export function mapPayment(payload: BackendPayment): Payment {
  return {
    id: payload.id ?? "",
    bookingId: payload.bookingId ?? "",
    method: payload.method ?? payload.provider ?? "VNPAY",
    amount: payload.amount ?? 0,
    paymentStatus: payload.paymentStatus ?? payload.status ?? "PENDING",
    transactionCode: payload.transactionCode,
    createdAt: payload.createdAt
  };
}

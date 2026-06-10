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

const villaImages = [
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
];

export function mapVilla(payload: BackendVilla, index = 0): Villa {
  return {
    id: payload.id ?? "",
    name: payload.name ?? "Untitled villa",
    location: payload.location ?? "Unknown location",
    description: payload.description ?? "",
    pricePerNight: Number(payload.pricePerNight ?? 0),
    capacity: Number(payload.capacity ?? 0),
    available: payload.available ?? payload.active ?? true,
    imageUrl: payload.imageUrl ?? villaImages[index % villaImages.length],
    rating: payload.rating ?? 4.8,
    numberOfBeds: payload.numberOfBeds ?? Math.max(1, Math.ceil(Number(payload.capacity ?? 2) / 2)),
    numberOfBaths: payload.numberOfBaths ?? 2,
    amenities: payload.amenities ?? ["Private pool", "Beach access", "Wifi"]
  };
}

export function mapBooking(payload: BackendBooking): Booking {
  return {
    id: payload.id ?? "",
    villaId: payload.villaId ?? "",
    villaName: payload.villaName,
    checkInDate: payload.checkInDate ?? "",
    checkOutDate: payload.checkOutDate ?? "",
    numberOfGuests: Number(payload.numberOfGuests ?? 0),
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
    amount: Number(payload.amount ?? 0),
    paymentStatus: payload.paymentStatus ?? payload.status ?? "PENDING",
    transactionCode: payload.transactionCode,
    createdAt: payload.createdAt
  };
}

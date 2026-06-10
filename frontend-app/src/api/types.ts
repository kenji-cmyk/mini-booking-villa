export type ApiEnvelope<T> = {
  success: boolean;
  data: T | null;
  error?: string | null;
  message?: string | null;
  timestamp?: string;
};

export type ApiError = {
  message: string;
  status: number;
};

export type Villa = {
  id: number | string;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  available: boolean;
  imageUrl?: string;
  rating?: number;
  numberOfBeds?: number;
  numberOfBaths?: number;
  amenities?: string[];
};

export type VillaSearchParams = {
  keyword?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  availableFrom?: string;
  availableTo?: string;
};

export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export type Booking = {
  id: number | string;
  villaId: number | string;
  villaName?: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  contactName: string;
  contactPhone: string;
  bookingStatus: BookingStatus;
  totalAmount?: number;
  createdAt?: string;
};

export type CreateBookingRequest = {
  villaId: number | string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  contactName: string;
  contactPhone: string;
};

export type PaymentMethod = "VNPAY" | "MOMO";

export type PaymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED";

export type Payment = {
  id: number | string;
  bookingId: number | string;
  method: PaymentMethod;
  amount: number;
  paymentStatus: PaymentStatus;
  transactionCode?: string;
  createdAt?: string;
};

export type CreatePaymentRequest = {
  bookingId: number | string;
  provider: PaymentMethod;
  transactionCode?: string;
  successful?: boolean;
};

export type CreateVillaRequest = {
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  capacity: number;
};

export type UpdateVillaRequest = CreateVillaRequest;

export type UpdateBookingStatusRequest = {
  status: BookingStatus;
};

export type BasicAuthCredentials = {
  username: string;
  password: string;
};

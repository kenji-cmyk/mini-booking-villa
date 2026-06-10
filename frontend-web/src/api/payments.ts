import { demoGuestCredentials } from "@/api/auth";
import { apiRequest } from "@/api/client";
import { mapPayment } from "@/api/mappers";
import type { CreatePaymentRequest, Payment } from "@/api/types";

const demoGuestAuth = {
  type: "basic",
  credentials: demoGuestCredentials
} as const;

export async function createPayment(payload: CreatePaymentRequest): Promise<Payment> {
  const payment = await apiRequest<unknown, CreatePaymentRequest>("/api/payments", {
    auth: demoGuestAuth,
    body: payload,
    method: "POST"
  });

  return mapPayment(payment as Payment);
}

export async function getPaymentStatus(bookingId: number | string): Promise<Payment> {
  const payment = await apiRequest<unknown>(`/api/payments/booking/${bookingId}`, {
    auth: demoGuestAuth
  });

  return mapPayment(payment as Payment);
}
